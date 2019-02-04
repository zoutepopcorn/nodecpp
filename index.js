#!/usr/bin/env node
console.clear();
const fs = require('fs');
const exec = require('child_process').exec;
const chalk = require('chalk');
const inquirer = require('inquirer');
const glob = require("glob")

let cppFile = './main.cpp';

const watch = (file) => {
    compile(file);  // run first time
    fs.watchFile(file, {interval: 250}, (curr, prev) => {
        info(`${file} file change`);
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
        if (!isError) {
            succes(` compile OK ${file}`);
            isError = true;
            run(file);

        }
    });
}

const fileMenu = () => {
    glob("*.cpp", {}, (er, files) => {
        const questions = [{
            type: 'list',
            name: 'file',
            message: 'Which file do you want to watch?',
            choices: files,
            filter: function (val) {
                return val.toLowerCase();
            }
        }];
        inquirer
            .prompt(questions)
            .then(answer => {
                watch(`./${answer.file}`);
            });
    });


}

if (fs.existsSync(cppFile)) {
    // succes(" main.cpp found");
    if (process.argv[2]) {
        // TODO: make options
        fileMenu();
    } else {
        watch(cppFile);
    }

} else {
    error(" main.cpp NOT found and no arguments");
}