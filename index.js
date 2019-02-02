#!/usr/bin/env node
console.clear();
const fs = require('fs');
const exec = require('child_process').exec;
const chalk = require('chalk');
const cppFile = './main.cpp';

const watch = (file) => {
    compile(file);  // run first time
    fs.watchFile(file, {interval: 250}, (curr, prev) => {
        succes(`>> ${file} file change`);
        compile(file);
    });
}

const succes = (data) => {
    console.log(chalk.green(data));
}

const error = (data) => {
    console.log(chalk.red(data));
}

const info = (data) => {
    console.log(chalk.blue(data));
}

const terminal = (data) => {
    console.log(chalk.bold.yellow(data));
}

const runner = (data) => {
    console.log(chalk.yellow(data));
}


const run = (file) => {
    const command = exec(`${file.replace(".cpp", "")}`);
    command.stdout.on('data', (data) => {
        terminal(data);
    });
    command.stdout.on('end', (data) => {
        succes(` compile complete ${file} `);
    });
}

const compile = (file) => {
    console.clear();
    info(` compiling ${file}`);
    const command = exec(`g++ ${file} -o ${file.replace(".cpp", "")}`);
    let isError = false;
    command.stdout.on('data', (data) => {
        terminal(data);
    });

    command.stderr.on('data', (data) => {
        isError = true;
        error(data);
    });

    command.stdout.on('end', (data) => {
        if(!isError) {
            succes(` compile OK ${file}`);
            isError = true;
            run(file);
        }
    });
}

if (fs.existsSync(cppFile)) {
    succes(" main.cpp found");
    watch(cppFile);
} else {
    error(" main.cpp NOT found");
}