import './style.css';
import './AddData.css';
import './data.css';
import { addTask } from './addTask.js';
import { home } from './home.js';
import { addProj } from './addProj.js';

let ho = document.querySelector('#home');
let today = document.querySelector('#today');
let week = document.querySelector('#week');
const getTodayDate=()=>{
    let tDate = new Date();
    let year = tDate.getFullYear();
    let month = tDate.getMonth() + 1;
    let date = tDate.getDate();
    let todayDate = `${year}-${month}-${date}`;
    return todayDate;
}
const removeClass=()=> {
    let leftMain = document.querySelectorAll('#leftMain div');
    let leftProj = document.querySelectorAll('.proj p');
    leftMain.forEach(x => {
        x.classList.remove('clicked');
    })
    leftProj.forEach(x => {
        x.classList.remove('clicked');
    })
}
today.addEventListener('click', () => {
    let arr = []
    removeClass();
    today.setAttribute('class', 'clicked');
    let data = JSON.parse(localStorage.getItem('task'));
    let todayDate = getTodayDate();
    if (data) {
        data.forEach(x => {
            if (x.date == todayDate)
                arr.push(x);
        })
    }
    renderInDom(arr);
})

const DataInToDo=()=> {
    addTask.addHTML();
    addTask.add();
}
document.addEventListener('DOMContentLoaded', () => {
    DataInToDo();
    let arr = []
    let data = JSON.parse(localStorage.getItem('task'));
    arr = checkProjectHome(data);
    renderInDom(arr);
    addProjectInDom();
});

function renderInDom(data) {
    home.addHTML();
    home.renderInDom(data);
}
ho.addEventListener('click', () => {
    removeClass();
    ho.setAttribute('class', 'clicked');
    let data = JSON.parse(localStorage.getItem('task'));
    let arr = []
    arr = checkProjectHome(data);
    renderInDom(arr);
})
function checkProjectHome(data) {
    if (data) {
        let arr = [];
        data.forEach(x => {
            if (x.project == 'Home') arr.push(x);
        })
        return arr;
    }
}
week.addEventListener('click', () => {
    removeClass();
    week.setAttribute('class', 'clicked');

    let todayDate = getTodayDate();
    let tYear = Number(todayDate.slice(0, 4));
    let tMonth = Number(todayDate.slice(5, 7)) - 1;
    let tDate = Number(todayDate.slice(8, 10));
    let today = new Date(tYear, tMonth, tDate);
    let weekEnd = new Date(tYear, tMonth, tDate + 7);
    let data = JSON.parse(localStorage.getItem('task'));
    let arr = [];
    if (data) {
        data.forEach((x) => {
            let fullDate = x.date;
            let taskYear = Number(fullDate.slice(0, 4));
            let taskMonth = Number(fullDate.slice(5, 7)) - 1;
            let taskDate = Number(fullDate.slice(8, 10));
            let taskDateObj = new Date(taskYear, taskMonth, taskDate);
            if (taskDateObj >= today && taskDateObj <= weekEnd) {
                arr.push(x);
            }
        });
    }
    let abc = []
    abc = checkProjectHome(arr);
    renderInDom(abc);
})

function addProjectInDom() {
    addProj.addHtml();
    addProj.getProj();
    addProj.add();
}


export { renderInDom, addProjectInDom, checkProjectHome, removeClass };

