import * as fs from "fs";
import archiver from "archiver";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenvFlow from "dotenv-flow";
import path from "path";


dotenvFlow.config();

function getLastModifiedFolder(inputDir: string) {
    try {
        const files = fs.readdirSync(inputDir).filter((item) => item.startsWith("jssimulation-"));

        const lastModifiedFolder = files.sort((a, b) => {
            const aStat = fs.statSync(`${inputDir}/${a}`);
            const bStat = fs.statSync(`${inputDir}/${b}`);
            return bStat.mtimeMs - aStat.mtimeMs;
        })[0];

        return lastModifiedFolder;
    } catch (error) {
        console.error(error);
    }
}

function archiveReport(inputDir: string, outputDir: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outputDir);
        const archive = archiver("zip", {
            zlib: { level: 9 } //  Sets the compression level.
        });

        output.on("close", () => {
            console.log(`Folder has been archived ${archive.pointer()} total bytes`);
            resolve();
        });

        archive.on('warning', (err) => {
            if (err.code === 'ENOENT') {
                console.warn('Warn:', err);
            } else {
                reject(err);
            }
        });

        archive.on("error", (err) => {
            reject(err);
        });

        archive.pipe(output);
        archive.directory(inputDir, false);
        archive.finalize();
    });
}

function deleteArchivedReport(inputDir: string) {
    try {
        fs.unlinkSync(inputDir);
        console.log("Zip folder has been deleted");
    } catch (error) {
        console.error(error);
    }
}

async function uploadReportsOnS3(filePath: string, folderName: string) {
    console.log("Uploading report on S3 bucket...");

    const s3Client = new S3Client();

    const fileContent = fs.createReadStream(filePath);
    const folder = `${process.env.S3_FOLDER}/${folderName}`;

    const uploadParams = {
        Bucket: process.env.S3_BUCKET,
        Key: folder,
        Body: fileContent,
        ContentType: "application/zip"
    };

    try {
        await s3Client.send(new PutObjectCommand(uploadParams));
        console.log("File uploaded successfully");
    } catch (error) {
        console.error("Error uploading file:", error);
    }
}

const folderSource = path.join(process.cwd(), 'target', 'gatling');
const folderName = getLastModifiedFolder(folderSource);

const inputDir = path.join(folderSource, folderName as string);
const outputDir = path.join(process.cwd(), 'target', 'gatling', `${folderName}.zip`);

folderName &&
    archiveReport(inputDir, outputDir).then(async () => {
        await uploadReportsOnS3(outputDir, folderName);
        deleteArchivedReport(outputDir);
    });
