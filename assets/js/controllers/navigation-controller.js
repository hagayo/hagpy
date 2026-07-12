export class NavigationController {
  initialize(){const button=document.querySelector('[data-action="menu"]');const sidebar=document.querySelector('.sidebar');button?.addEventListener('click',()=>{const open=sidebar.classList.toggle('open');button.setAttribute('aria-expanded',String(open))});document.addEventListener('keydown',event=>{if(event.key==='Escape')sidebar?.classList.remove('open')})}
}
