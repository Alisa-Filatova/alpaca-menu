import { isDesktopDevice } from './helpers';

const updateAria = () => {
  const orientation = isDesktopDevice() ? 'horizontal' : 'vertical';

  document
    .getElementById('main-menu-bar')
    .setAttribute('aria-orientation', orientation);

  document
    .querySelectorAll('[aria-haspopup]')
    .forEach((item) => item.setAttribute('aria-haspopup', isDesktopDevice()));
};

const changeAriaExpanded = (button, expanded) => {
  button.setAttribute('aria-expanded', expanded);
};

const toggleAriaExpanded = (button) => {
  const isExpanded = button.getAttribute('aria-expanded');
  changeAriaExpanded(button, !JSON.parse(isExpanded));
};

const toggleOverlay = () => {
  const overlay = document.getElementById('overlay');
  const className = 'overlay_visible';

  if (overlay.classList.contains(className)) {
    overlay.classList.remove(className);
  } else {
    overlay.classList.add(className);
  }
};

const toggleSidebarButton = () => {
  const buttonText = document.querySelector('.sidebar-menu-button__text');
  const sidebarButton = document.getElementById('sidebar-menu-btn');
  const isExpanded = sidebarButton.getAttribute('aria-expanded');

  if (JSON.parse(isExpanded)) {
    const text = 'Раскрыть меню';
    sidebarButton.setAttribute('title', text);
    buttonText.innerHTML = text;
  } else {
    const text = 'Свернуть меню';
    sidebarButton.setAttribute('title', text);
    buttonText.innerHTML = text;
  }

  toggleAriaExpanded(sidebarButton);
};

const toggleSidebar = () => {
  const sidebar = document.getElementById('main-nav');
  const className = 'main-menu_visible';

  if (sidebar.classList.contains(className)) {
    sidebar.classList.remove(className);
  } else {
    sidebar.classList.add(className);
  }

  toggleOverlay();
  toggleSidebarButton();
};

const getSubmenu = (menu) => {
  return menu.querySelector(':scope > .menu_submenu');
};

const getMenuButton = (menu) => {
  return menu.querySelector(':scope > .menu__button');
};

const openMenu = (menu) => {
  getSubmenu(menu).classList.remove('menu_submenu_collapsed');

  const button = getMenuButton(menu);
  button.classList.add('menu-button_pressed');
  changeAriaExpanded(button, true);
};

const closeMenu = (menu) => {
  getSubmenu(menu).classList.add('menu_submenu_collapsed');

  const button = getMenuButton(menu);
  button.classList.remove('menu-button_pressed');
  changeAriaExpanded(button, false);
};

const toggleMenu = (menu) => {
  if (getSubmenu(menu).classList.contains('menu_submenu_collapsed')) {
    openMenu(menu);
  } else {
    closeMenu(menu);
  }
};

const initializeMenu = (menu) => {
  const submenu = getSubmenu(menu);
  const button = getMenuButton(menu);

  submenu.addEventListener('focusout', (event) => {
    if (isDesktopDevice() && !submenu.contains(event.relatedTarget)) {
      closeMenu(menu);
    }
  });

  button.addEventListener('click', () => {
    if (!isDesktopDevice()) {
      toggleMenu(menu);
    }
  });

  button.addEventListener('focus', () => {
    openMenu(menu);
  });

  button.addEventListener('focusout', (event) => {
    if (isDesktopDevice() && !submenu.contains(event.relatedTarget)) {
      closeMenu(menu);
    }
  });

  button.addEventListener('mousedown', (event) => {
    event.preventDefault();
  });

  button.addEventListener('mouseenter', (event) => {
    const isButtonPressed = event
      .currentTarget
      .classList
      .contains('menu-button_pressed');

    if (isDesktopDevice() && !isButtonPressed) {
      toggleMenu(menu);
    }
  });

  menu.addEventListener('mouseleave', () => {
    if (isDesktopDevice()) {
      closeMenu(menu);
    }
  });
};

document
  .querySelectorAll('.menu__item_has-submenu')
  .forEach(initializeMenu);

document
  .getElementById('sidebar-menu-btn')
  .addEventListener('click', toggleSidebar);

document
  .getElementById('overlay')
  .addEventListener('click', toggleSidebar);

let timeoutId;

window.addEventListener('resize', () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(updateAria, 100);
});
