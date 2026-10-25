import { execSync } from 'child\_process';
import path from 'path';

export default { 
    name: 'check\_types', 
    
    description: 'Chạy npx tsc --noEmit trong target-app để kiểm tra lỗi kiểu dữ liệu TypeScript.', 
    
    parameters: { 
        type: 'object', 
        properties: {} 
    }, 
    
    async execute() { 
        const targetDir = path.resolve(process.cwd(), '../target-app'); 
        
        try { 
            const stdout = execSync('npx tsc --noEmit',{ 
                cwd: targetDir, 
                encoding: 'utf-8' 
            });
        
            return JSON.stringify({ 
                status: 'SUCCESS', 
                message: 'Không phát hiện lỗi kiểu dữ liệu nào!'
            }); 
        } catch (error) { 
            return JSON.stringify({ 
                status: 'FAILED', 
                message: 'Phát hiện lỗi kiểu dữ liệu TypeScript!', 
                errorLog: error.stdout ? error.stdout.toString() : error.message 
            }); 
        } 
    } 
};