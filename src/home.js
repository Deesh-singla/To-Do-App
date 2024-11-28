const home = (() => {
    let body, divMain, right;
    const addHTML = () => {
        right = document.querySelector('#right');
        body = document.querySelector('body');
        divMain = document.createElement('div');
    }
    const createELement = () => {
        let div = document.createElement('div');
        let divleft = document.createElement('div');
        let divright = document.createElement('div');
        let checkBox = document.createElement('input');
        let divCheck = document.createElement('div');
        let title = document.createElement('div');
        let detail = document.createElement('button');
        let divDetail = document.createElement('div');
        let date = document.createElement('div');
        let del = document.createElement('button');
        let divDel = document.createElement('div');
        return { div, divleft, divright, checkBox, divCheck, title, detail, divDetail, date, del, divDel };
    }
    const renderInDom = (data) => {
        if (data) {
            right.textContent = '';
            data.forEach((x, index) => {
                let obj = createELement();
                obj.checkBox.type = 'checkbox';
                obj.checkBox.setAttribute('class', 'taskDone');
                obj.checkBox.addEventListener('click', () => {
                    if (obj.checkBox.checked == true) {
                        divMain.style.textDecoration = 'line-through';
                        divMain.style.opacity = '0.7';
                    }
                    else {
                        divMain.style.textDecoration = 'None';
                        divMain.style.opacity = '1';
                    }
                })
                obj.divCheck.append(obj.checkBox);
                obj.divCheck.setAttribute('class', 'done');
                obj.title.textContent = x.title;
                obj.title.setAttribute('class', 'heading');
                obj.divleft.append(obj.divCheck, obj.title);
                obj.divleft.setAttribute('class', 'leftSide');
                obj.detail.textContent = 'Details';
                obj.detail.addEventListener('click', () => {
                    displayDetail(x);
                })
                obj.divDetail.append(obj.detail);
                obj.divDetail.setAttribute('class', 'detailBtn');
                obj.date.textContent = x.date;
                obj.date.setAttribute('class', 'date');
                obj.del.textContent = 'X';
                obj.del.addEventListener('click', () => {
                    obj.div.remove();
                    const updatedData = data.filter((_, i) => i !== index);
                    localStorage.setItem('task', JSON.stringify(updatedData));
                    data = updatedData;
                })
                obj.divDel.append(obj.del);
                obj.divDel.setAttribute('class', 'delBtn');
                obj.divright.append(obj.divDetail, obj.date, obj.divDel);
                obj.divright.setAttribute('class', 'rightSide');
                obj.div.append(obj.divleft, obj.divright);
                obj.div.setAttribute('class', 'element');
                divMain.append(obj.div);
                divMain.setAttribute('class', 'divMain');
                priority(obj, x);
            })
            right.append(divMain);
        }
    }
    const createElementForDisplay = () => {
        let div = document.createElement('div');
        let divCenter = document.createElement('div');
        let cut = document.createElement('button')
        let divCut = document.createElement('div');
        let title = document.createElement('h1');
        let divprior = document.createElement('div');
        let head1 = document.createElement('h4');
        let p1 = document.createElement('p');
        let divDueDate = document.createElement('div');
        let head2 = document.createElement('h4');
        let p2 = document.createElement('p');
        let divDetails = document.createElement('div');
        let head3 = document.createElement('h4');
        let p3 = document.createElement('p');
        let head4 = document.createElement('h4');
        let p4 = document.createElement('p');
        let divProject = document.createElement('div');
        return { div, divCenter, cut, divCut, title, divprior, head1, p1, divDueDate, head2, p2, divDetails, head3, p3, head4, p4, divProject };
    }
    const displayDetail = (x) => {
        let obj1 = createElementForDisplay();
        obj1.cut.textContent = 'X';
        obj1.cut.addEventListener('click', () => {
            obj1.div.remove();
            document.querySelector('#main').classList.remove('blurred');
        })
        obj1.divCut.append(obj1.cut);
        obj1.divCut.setAttribute('class', 'close');
        obj1.title.textContent = x.title;
        obj1.head1.textContent = 'Priority: ';
        obj1.p1.textContent = x.priority;
        obj1.divprior.append(obj1.head1, obj1.p1);
        obj1.divprior.setAttribute('class', 'line')
        obj1.head2.textContent = 'Date: ';
        obj1.p2.textContent = x.date;
        obj1.divDueDate.append(obj1.head2, obj1.p2);
        obj1.divDueDate.setAttribute('class', 'line')
        obj1.head3.textContent = 'Details: ';
        obj1.p3.textContent = x.detail;
        obj1.divDetails.append(obj1.head3, obj1.p3);
        obj1.divDetails.setAttribute('class', 'line')
        obj1.head4.textContent = 'Project: ';
        obj1.p4.textContent = x.project;
        obj1.divProject.append(obj1.head4, obj1.p4);
        obj1.divProject.setAttribute('class', 'line');
        obj1.divCenter.append(obj1.divCut, obj1.title, obj1.divprior, obj1.divDueDate, obj1.divDetails, obj1.divProject);
        obj1.divCenter.setAttribute('class', 'center');
        obj1.div.append(obj1.divCenter)
        obj1.div.setAttribute('id', 'detailsPopUp');
        body.append(obj1.div);
        document.querySelector('#main').classList.add('blurred');
    }
    const priority = (obj, x) => {
        if (x.priority == 'High') obj.div.style.borderLeft = '3px solid red';
        else obj.div.style.borderLeft = '3px solid green';
    }
    return { addHTML, renderInDom };
})();
export { home };