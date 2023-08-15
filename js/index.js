// Fetch request
fetch('projects.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const projects = document.querySelector('#projects');
        let projectsString = '';

        data.projects.forEach((project) => {
            projectsString += `

            <div class="project" id="${
                project.id
            }" tabindex="0" data-modal="modal-${project.id}">
            
          <div style="background-image: url(${
              project.img
          }); background-color: black; height: 400px;"></div>

            <h3>${project.name}</h3>
            <section class="tech flex">
            ${project.stack
                .map((tech) => `<span class="tech-tag small">${tech}</span>`)
                .join('')}
            </section>
          
          </div>
          
          <!-- Project Modal -->
          <div class="project-modal flex closed" id="modal-${project.id}">
            <span class="material-symbols-outlined close-btn" id="close-btn-${
                project.id
            }">
              cancel
            </span>
            <div class="modal-guts flex">
              <!-- things that scroll -->
              <div style="background-image: url(${project.img});"
                class="project-img-cover"></div>

              <div class="project-info">
                <h3>${project.name}</h3>
                <section class="tech flex">

            ${project.stack
                .map((tech) => `<span class="tech-tag">${tech}</span>`)
                .join('')}

                </section>
                <p>${project.longDesc}</p>
                <section class="project-buttons flex">
                  <a href="${
                      project.githubLink ? project.githubLink : ''
                  }" target="_blank"><span class="github-btn">GitHub</span></a>
                  <a href="${
                      project.liveLink
                  }" target="_blank"><span class="live-btn">Live</span></a>
                </section>
          
              </div>
            </div>
          
          </div>`;
        });
        projects.innerHTML += projectsString;
    });

window.onload = function () {
    const overlay = document.querySelector('.modal-overlay');
    const body = document.querySelector('body');
    const closeBtns = document.querySelectorAll(`.close-btn`);

    function openModal(modal) {
        console.log('Open modal!' + modal);
        document.getElementById(modal).classList.remove('closed');
        overlay.classList.remove('closed');
        body.classList.add('modal-open');

        overlay.addEventListener('click', () => closeModal(modal));
        // WHich button id??
        closeBtns.forEach((btn) =>
            btn.addEventListener('click', () => closeModal(modal))
        );

        document.addEventListener('keyup', (e) => {
            if (e.key == 'Escape' || e.key == 27) {
                closeModal(modal);
            }
        });
    }
    //
    function closeModal(modal) {
        console.log(modal);
        document.getElementById(modal).classList.add('closed');
        overlay.classList.add('closed');
        body.classList.remove('modal-open');
    }

    // Listens for click on one of the project tiles
    window.addEventListener('click', (e) => {
        if (e.target.className === 'project') {
            openModal('modal-' + e.target.id);
        }
    });
};

// Adds keyboard-accessible actions to static HTML elements ==> Makes Project Tiles triggerable with Enter or Space
// Source: https://www.outsystems.com/forums/discussion/79561/clickable-divs-focus-works-but-enter-button-does-not/
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' || e.code === 'Enter' || e.code === 13) {
        e.preventDefault();
        document.activeElement.click();
    }
});

// Highlighting the nav item to show the current section of the page
// Source: https://codepen.io/Web_Cifar/pen/LYRBbVE
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav .top-nav li a');
document.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach((li) => {
        li.classList.remove('active');
        if (li.href.includes(current)) {
            li.classList.add('active');
        }
    });
});
