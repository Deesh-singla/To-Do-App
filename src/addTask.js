import { renderInDom } from './index.js';
import { addProjectInDom } from './index.js';
import { checkProjectHome } from './index.js';
const addTask = (() => {
    let task, body, r;
    let arrToDo = [];
    let arrProj = [];
    const addHTML = () => {
        r = document.querySelector('#right');
        task = document.querySelector('#add')
        body = document.querySelector('body');
    }
    const createELement = () => {
        let divMain = document.createElement('div');
        let divcenter = document.createElement('div');
        let divhead = document.createElement('div');
        let divleft = document.createElement('div');
        let divright = document.createElement('div');
        let cut = document.createElement('button');
        let h2 = document.createElement('h2');
        return { divMain, divcenter, divhead, divleft, divright, cut, h2 };
    }
    const add = () => {
        task.addEventListener('click', () => {
            let obj = createELement();
            obj.divMain.setAttribute('id', 'addMain');
            const overlay = document.createElement('div');
            overlay.setAttribute('id', 'overlay');
            overlay.addEventListener('click', () => {
                closeModal(obj, overlay);
            });
            head(obj);
            left(obj);
            right(obj);
            obj.divcenter.append(obj.divleft, obj.divright)
            obj.divcenter.setAttribute('id', 'addcenter');
            obj.divMain.append(obj.divhead, obj.divcenter);
            body.append(obj.divMain);
            document.querySelector('#main').classList.add('blurred');
        })
    }
    const head = (obj) => {
        obj.h2.textContent = 'Create a new...'
        obj.cut.textContent = 'X';
        obj.cut.style.fontSize = '30px'
        obj.cut.style.cursor = 'pointer';
        obj.cut.addEventListener('click', () => {
            closeModal(obj);
        });
        obj.divhead.append(obj.h2, obj.cut);
        obj.divhead.setAttribute('id', 'addHead');

    }
    const closeModal = (obj, overlay = null) => {
        obj.divMain.remove();
        if (overlay) overlay.remove();
        document.querySelector('#main').classList.remove('blurred');
    }
    const createELementLeft = () => {
        let task = document.createElement('h2');
        let proj = document.createElement('h2');
        return { task, proj }
    }
    const left = (obj) => {
        let obj1 = createELementLeft();
        obj1.task.textContent = 'To Do';
        obj1.task.setAttribute('id', 'addtodo')
        obj1.proj.textContent = 'Project';
        obj1.proj.setAttribute('id', 'addproj')
        obj.divleft.append(obj1.task, obj1.proj);
        obj.divleft.setAttribute('id', 'addleft');
        obj1.proj.addEventListener('click', () => {
            proj(obj);
        });
        obj1.task.addEventListener('click', () => {
            toDo(obj);
        });
    }
    const right = (obj) => {
        obj.divright.setAttribute('id', 'addright');
        toDo(obj);
    }
    const createELementToDo = () => {
        let title = document.createElement('input');
        let detail = document.createElement('textarea');
        let date = document.createElement('input');
        let low = document.createElement('button')
        let high = document.createElement('button')
        let d = document.createElement('h2');
        let prior = document.createElement('h2');
        let sub = document.createElement('button')
        let div1 = document.createElement('div')
        let div2 = document.createElement('div')
        let div3 = document.createElement('div');
        let div4 = document.createElement('div');
        let proj = document.createElement('h2');
        let projName = document.createElement('select');
        let opt = document.createElement('option');
        return { title, detail, date, low, high, d, prior, sub, div1, div2, div3, proj, projName, opt, div4 };
    }
    const toDo = (obj) => {
        obj.divright.textContent = '';
        let obj1 = createELementToDo();
        let proj = JSON.parse(localStorage.getItem('project'));
        obj1.title.type = 'text';
        obj1.title.id = 'name';
        obj1.title.placeholder = 'Title';
        obj1.title.style.fontSize = '25px';
        obj1.detail.rows = '8';
        obj1.detail.placeholder = 'Details';
        obj1.detail.style.fontSize = '20px';
        obj1.d.textContent = 'Due Date: ';
        obj1.date.type = 'date';
        obj1.date.style.border = `1px solid #3ba395`
        obj1.date.style.borderRadius = `5px`
        obj1.date.style.color = `#3ba395`
        obj1.div1.append(obj1.d, obj1.date);
        obj1.proj.textContent = `Project: `;
        obj1.opt.value = 'Home';
        obj1.opt.textContent = 'Home';
        obj1.projName.append(obj1.opt);
        obj1.projName.setAttribute('class', 'projName');
        addingProjName(proj, obj1);
        obj1.div4.append(obj1.proj, obj1.projName);
        obj1.prior.textContent = `Priority: `;
        obj1.low.textContent = 'Low'
        obj1.low.style.border = `1px solid green`
        obj1.low.style.color = 'green';
        obj1.high.textContent = 'High';
        obj1.high.style.border = `1px solid red`
        obj1.high.style.color = 'red';
        obj1.div2.append(obj1.prior, obj1.low, obj1.high)
        obj1.sub.textContent = 'Add To Do';
        obj1.sub.style.border = '1px solid #3ba395';
        obj1.sub.style.color = '#3ba395';
        obj1.sub.style.width = '120px';
        obj1.sub.style.height = '30px';
        let p = '';

        obj1.low.addEventListener('click', () => {
            p = 'low'
            obj1.low.style.border = `1px solid green`
            obj1.low.style.color = 'white';
            obj1.low.style.backgroundColor = 'green';
            obj1.high.style.border = `1px solid red`
            obj1.high.style.color = 'red';
            obj1.high.style.backgroundColor = 'white';
        })
        obj1.high.addEventListener('click', () => {
            p = 'high';
            obj1.high.style.border = `1px solid red`
            obj1.high.style.color = 'white';
            obj1.high.style.backgroundColor = 'red';
            obj1.low.style.border = `1px solid green`
            obj1.low.style.color = 'green';
            obj1.low.style.backgroundColor = 'white';

        })
        obj1.sub.setAttribute('class', 'AddToDo');
        obj1.sub.addEventListener('click', () => {
            addDataToDo(obj1, p, obj1.projName.value);
            localStorage.setItem('task', JSON.stringify(arrToDo));
            r.textContent = '';
            closeModal(obj);
            redirectToHome();
            let data = JSON.parse(localStorage.getItem('task'));
            let arr = [];
            arr = checkProjectHome(data);
            if (arr) renderInDom(arr);

        });
        obj1.div3.setAttribute('class', 'intodo');
        obj1.div3.append(obj1.title, obj1.detail, obj1.div1, obj1.div4, obj1.div2, obj1.sub);
        obj.divright.append(obj1.div3);
    }
    const redirectToHome = () => {
        let leftMain = document.querySelectorAll('#leftMain div');
        leftMain.forEach(x => {
            x.classList.remove('clicked');
        })
        let ho = document.querySelector('#home');
        ho.setAttribute('class', 'clicked');
    }
    const createELementproj = () => {
        let div = document.createElement('div');
        let title = document.createElement('input');
        let sub = document.createElement('button');
        return { title, sub, div }
    }
    const proj = (obj) => {
        obj.divright.textContent = '';
        let obj1 = createELementproj();
        obj1.title.type = 'text';
        obj1.title.style.fontSize = '25px'
        obj1.title.placeholder = 'Title';
        obj1.sub.textContent = 'Create Project';
        obj1.sub.addEventListener('click', () => {
            addDataProj(obj1);
            localStorage.setItem('project', JSON.stringify(arrProj));
            closeModal(obj);
            redirectToHome();
            addProjectInDom();
        })
        obj.divright.setAttribute('class', 'inproj');
        obj1.div.append(obj1.title, obj1.sub)
        obj1.div.setAttribute('class', 'inproj');
        obj.divright.append(obj1.div);
    }
    const addDataToDo = (obj1, p, val) => {
        arrToDo = JSON.parse(localStorage.getItem('task')) || [];
        let obj = {};
        obj.title = obj1.title.value;
        obj.detail = obj1.detail.value
        obj.date = obj1.date.value;
        obj.project = val;
        if (p == 'low') obj.priority = 'Low'
        else obj.priority = 'High'
        arrToDo.push(obj);
    }
    const addDataProj = (obj1) => {
        let obj = {}
        obj.title = obj1.title.value;
        arrProj.push(obj);
    }
    const addingProjName = (proj, obj1) => {
        if (proj) {
            proj.forEach(x => {
                let opt = document.createElement('option');
                opt.textContent = x.title;
                opt.value = x.title;
                obj1.projName.append(opt);
            })
        }
    }
    return { addHTML, add };
})();
export { addTask };