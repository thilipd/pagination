const body = document.querySelector('body');
const container = document.querySelector('.container');

let data, len, sectionCount, btnContainer, btnElement, btnInnerTxt, btn;




// Functions

//get data for each section and create buttons

const getDataForSection = (data, count, section) => {

    // Creating a table for the data for each section

    section.forEach((v, i) => {

        for (let j = section.length; j > 0; j--) {

            let dataName = data[((i + 1) * 10) - j].name;
            let dataEmail = data[((i + 1) * 10) - j].email;
            let dataId = data[((i + 1) * 10) - j].id


            v.insertAdjacentHTML('beforeend', `
           <table class='data_${dataId}'>
           <tr>
           <th>🔲</th>
           <th>Id:</th>
           <td>${dataId}</td>
           </tr>
           <tr>
           <th>📛</th>
           <th>Name:</th>
           <td>${dataName}</td>
           </tr>
           <tr>
           <th>📧</th>
           <th>e-mail:</th>
           <td>${dataEmail}</td>
           </tr>
           </table>

            `)
        }

        v.insertAdjacentHTML('beforeend', `
        <div class ="btn_container">
        </div>
        `);

        btnContainer = document.querySelector('.btn_container');

        btnElement = v.childNodes[32];

        // Creating buttons for each sections

        for (let i = 0; i < count; i++) {

            btnElement.insertAdjacentHTML('beforeend', `<button class='btn btn_${i} '>${i + 1}</button>`);


        }


    });


}

// Showing only sections which are active and active for button

const showSection = (section) => {
    btn = document.querySelectorAll('.btn');

    btn.forEach(btnEle => {

        btnEle.addEventListener('click', (e) => {

            btnInnerTxt = Number(e.target.innerText)

            // showing only the selected section by event

            section.forEach((v, i) => {

                if (i + 1 === btnInnerTxt) {

                    v.classList.remove('hidden');

                    btnElement = v.childNodes[32].childNodes;


                    // Active mode for button by event
                    btnElement.forEach(btn => {

                        if (Number(btn.innerText) === btnInnerTxt) {
                            btn.classList.add('active');
                        }
                    })

                    //////////////////////////   

                } else {
                    v.classList.add('hidden')
                }
            })

        })

    })


}

// Sections for the datas to be displayed

const createSection = (data) => {

    len = data.length;
    sectionCount = Math.floor(len / 10);

    // Creating section

    for (let i = 1; i <= sectionCount; i++) {
        container.insertAdjacentHTML('beforeend', `
        <section class='section_${i} section hidden'>
        </section>
        `);
    }

    const section = document.querySelectorAll('.section');

    section[0].classList.remove('hidden');

    // calling the functions

    getDataForSection(data, sectionCount, section);
    showSection(section);

}

// XML request for the test data;

let req = new XMLHttpRequest;

req.open('GET', 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json');

req.send();

req.onload = () => {

    data = JSON.parse(req.response);

    // calling the function

    createSection(data);

};













