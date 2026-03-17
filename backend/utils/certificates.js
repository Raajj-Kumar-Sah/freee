import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateCertificate = (userName, courseName, certificateId) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            layout: 'landscape',
            size: 'A4',
        });

        const fileName = `cert_${certificateId}.pdf`;
        const filePath = path.join(__dirname, '../uploads/certificates', fileName);
        
        // Ensure directory exists
        const dir = path.join(__dirname, '../uploads/certificates');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }

        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Styling
        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f8fafc');
        
        doc.fontSize(60).fillColor('#2563eb').text('FreeSiksha', 0, 80, { align: 'center' });
        doc.fontSize(30).fillColor('#1e293b').text('CERTIFICATE OF COMPLETION', 0, 160, { align: 'center' });
        
        doc.fontSize(20).fillColor('#64748b').text('This is to certify that', 0, 240, { align: 'center' });
        doc.fontSize(40).fillColor('#0f172a').text(userName, 0, 280, { align: 'center' });
        
        doc.fontSize(20).fillColor('#64748b').text('has successfully completed the course', 0, 360, { align: 'center' });
        doc.fontSize(30).fillColor('#2563eb').text(courseName, 0, 400, { align: 'center' });
        
        doc.fontSize(12).fillColor('#94a3b8').text(`Certificate ID: ${certificateId}`, 50, 500);
        doc.text(`Issued Date: ${new Date().toLocaleDateString()}`, 50, 520);

        doc.end();

        stream.on('finish', () => resolve(fileName));
        stream.on('error', reject);
    });
};


