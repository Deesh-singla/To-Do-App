import { renderInDom } from "./index.js";
import { removeClass } from "./index.js";
const addProj = (() => {
    let project, proj, right;
    let divMain = document.createElement('div');
    const addHtml = () => {
        project = document.querySelector('#projects');
        right = document.querySelector('#right');
    }
    const getProj = () => {
        proj = JSON.parse(localStorage.getItem('project'));
    }
    const createELement = () => {
        let div = document.createElement('div');
        let title = document.createElement('p');
        return { div, title };
    }
    const add = () => {
        if (proj) {
            proj.forEach((x, index) => {
                let obj = createELement();
                obj.title.textContent = x.title;
                obj.div.append(obj.title)
                obj.div.setAttribute('id', 'proj');
                divMain.append(obj.div);
                obj.title.addEventListener('click', () => {
                    removeClass();
                    obj.div.setAttribute('class', 'clicked');
                    let arr = [];
                    right.textContent = '';
                    let data = JSON.parse(localStorage.getItem('task'));
                    if (data) {
                        data.forEach(y => {
                            if (y.project == x.title)
                                arr.push(y);
                        })
                    }
                    if (arr) renderInDom(arr);
                    if (right.textContent == '') emptyProject(obj, x, index);
                })
            })
            project.append(divMain);
        }
    }
    const createELementDelProj = () => {
        let div = document.createElement('div');
        let h1 = document.createElement('h1');
        let p = document.createElement('p');
        let button = document.createElement('button');
        return { div, h1, p, button };
    }
    const emptyProject = (obj1, x, index) => {
        console.log(x);
        console.log('hello');
        let obj = createELementDelProj();
        obj.h1.textContent = 'Empty Project!';
        obj.p.textContent = 'Create a new to-do item or delete project.';
        obj.button.textContent = 'Delete Project';
        obj.div.append(obj.h1, obj.p, obj.button);
        obj.div.setAttribute('id', 'emptyDiv');
        right.append(obj.div);
        obj.button.addEventListener('click', () => {
            obj.div.remove();
            obj1.div.remove();
            let projects = JSON.parse(localStorage.getItem('project'))
            const updatedData = projects.filter((_, i) => i !== index);
            localStorage.setItem('project', JSON.stringify(updatedData));
            projects = updatedData;
        })
    }

    return { addHtml, getProj, add }
})()
export { addProj }