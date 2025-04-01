import db from '../../lib/db';
import { generateWithPrompt } from '../../lib/siliconflow';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { type, title, page } = req.body;
    
    try {
      let result;
      if (type === 'titles') {
        const prompt = `Generate 10 interesting and diverse article titles about technology, science, and curious facts. 
          Make them engaging and click-worthy. Format as a bullet list with each title on a new line starting with "- ". 
          Page requested: ${page || 1}`;
        
        const generatedTitles = await generateWithPrompt(prompt);
        const titles = generatedTitles.split('\n')
          .filter(line => line.startsWith('- '))
          .map(line => line.substring(2).trim());
        
        // 存储到数据库
        const stmt = await db.prepare("INSERT INTO titles (title) VALUES (?)");
        for (const title of titles) {
          await stmt.run(title);
        }
        await stmt.finalize();
        
        result = { titles };
      } else if (type === 'article') {
        const prompt = `Write a detailed, engaging article about "${title}". 
          The article should be informative yet entertaining, around 500 words. 
          At the end, suggest 3 related topics as bullet points with each starting with "- ".`;
        
        const generatedContent = await generateWithPrompt(prompt, 1500);
        const content = generatedContent.split('\n\nRelated topics:')[0].trim();
        const related = generatedContent.split('\n\nRelated topics:')[1]
          ?.split('\n')
          .filter(line => line.startsWith('- '))
          .map(line => line.substring(2).trim()) || [];
        
        // 获取title_id
        const titleRow = await db.get("SELECT id FROM titles WHERE title = ?", [title]);
        let titleId;
        
        if (titleRow) {
          titleId = titleRow.id;
        } else {
          const insert = await db.run("INSERT INTO titles (title) VALUES (?)", [title]);
          titleId = insert.lastID;
        }
        
        // 存储文章
        await db.run(
          "INSERT INTO articles (title_id, content, related_titles) VALUES (?, ?, ?)",
          [titleId, content, JSON.stringify(related)]
        );
        
        result = { content, related };
      }
      
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}