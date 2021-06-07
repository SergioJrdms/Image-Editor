const sharp = require('sharp')
const compress_images = require('compress-images')
const fs = require('fs')

let path = process.argv[2]
let width = Number(process.argv[3])

function resize(Inputpath, outputPath, width){
    
    sharp(Inputpath).resize({width: width})
    .toFile(outputPath, (error) => {
        if(error){
            console.log("Houve Um Erro!", error)
        }else{
            console.log("Imagem Redimensionada Com Sucesso!")
            compress(outputPath, "./compressed/")
        }
    })   
}

function compress(pathInput, outputPath){

    compress_images(pathInput, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
function (error, completed, statistic) {
console.log("-------------");
console.log(error);
console.log(completed);
console.log(statistic);
console.log("-------------");

fs.unlink(pathInput, error =>{
    if(error){
        console.log(error)
    }else{
        console.log(pathInput, "Apagado")
    }
})

}
);

}

resize(path, './temp/output_resize.png', width)