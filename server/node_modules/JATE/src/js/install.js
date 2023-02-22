const butInstall = document.getElementById('buttonInstall');


// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    console.log(event);
    event.preventDefault();
    window.deferredPrompt = event;
    // toggles hidden class
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    console.log('working');
    const promptEvent = window.deferredPrompt;
    if(!promptEvent) {
        return;
    }
    promptEvent.prompt();

    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    console.log('installed');
    window.deferredPrompt = null;
});
