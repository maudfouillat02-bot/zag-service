// ================================
// MENU
// ================================

const menuButton = document.getElementById("menuButton");
const menu = document.querySelector(".menu");

if (menuButton && menu) {

    menuButton.addEventListener("click", function () {

        if (menu.style.display === "none" || menu.style.display === "") {
            menu.style.display = "flex";
        } else {
            menu.style.display = "none";
        }

    });

}


// ================================
// BOUTON SERVICES
// ================================

const serviceButton = document.getElementById("serviceButton");
const services = document.getElementById("services");

if (serviceButton && services) {

    serviceButton.addEventListener("click", function () {

        if (services.style.display === "none" || services.style.display === "") {

            services.style.display = "block";
            serviceButton.textContent = "Masquer les services";

            const cards = document.querySelectorAll(".service-card");

            cards.forEach(function (card, index) {

                card.style.opacity = "0";
                card.style.transform = "translateY(40px)";

                setTimeout(function () {

                    card.style.transition =
                        "opacity 0.8s ease, transform 0.8s ease";

                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";

                }, 300 + (index * 300));

            });

            setTimeout(function () {

                const position =
                    services.getBoundingClientRect().top +
                    window.scrollY -
                    80;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            }, 100);

        } else {

            services.style.display = "none";
            serviceButton.textContent = "Découvrir nos services";

        }

    });

}


// ================================
// NAVIGATION DU MENU
// ================================

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (menu) {
            menu.style.display = "none";
        }

        const accueil = document.getElementById("accueil");
        const apropos = document.getElementById("apropos");
        const contact = document.getElementById("contact");

        if (services) {
            services.style.display = "none";
        }

        if (apropos) {
            apropos.style.display = "none";
        }

        if (contact) {
            contact.style.display = "none";
        }

        if (serviceButton) {
            serviceButton.style.display = "none";
        }

        const destination = link.getAttribute("href");

        // ACCUEIL
        if (destination === "#accueil") {

            afficherLogoAccueil();

            if (serviceButton) {
                serviceButton.style.display = "block";
                serviceButton.textContent = "Découvrir nos services";
            }

            if (accueil) {
                accueil.style.display = "block";
                accueil.scrollIntoView({
                    behavior: "smooth"
                });
            }

        }

        // SERVICES
        if (destination === "#services") {

            afficherLogoRetour();

            if (services) {
                services.style.display = "block";
                services.scrollIntoView({
                    behavior: "smooth"
                });
            }

        }

        // À PROPOS
        if (destination === "#apropos") {

            afficherLogoRetour();

            if (apropos) {
                apropos.style.display = "block";
                apropos.scrollIntoView({
                    behavior: "smooth"
                });
            }

        }

        // CONTACT
        if (destination === "#contact") {

            afficherLogoRetour();

            if (contact) {
                contact.style.display = "block";
                contact.scrollIntoView({
                    behavior: "smooth"
                });
            }

        }

    });

});


// ================================
// LOGO
// ================================

const logo = document.querySelector(".logo");

function afficherLogoAccueil() {

    if (logo) {
        logo.textContent = "ZAG SERVICE";
    }

}

function afficherLogoRetour() {

    if (logo) {
        logo.textContent = "⌂";
    }

}

if (logo) {

    logo.addEventListener("click", function () {

        if (menu) {
            menu.style.display = "none";
        }

        if (services) {
            services.style.display = "none";
        }

        const apropos = document.getElementById("apropos");
        const contact = document.getElementById("contact");
        const accueil = document.getElementById("accueil");

        if (apropos) {
            apropos.style.display = "none";
        }

        if (contact) {
            contact.style.display = "none";
        }

        if (accueil) {
            accueil.style.display = "block";
        }

        if (serviceButton) {
            serviceButton.style.display = "block";
            serviceButton.textContent = "Découvrir nos services";
        }

        afficherLogoAccueil();

        if (accueil) {
            accueil.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

}


// ================================
// SUPABASE
// ================================

const SUPABASE_URL =
    "https://bkmhffpzhdhxrgxkinkk.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_UcQl5wt5aXwmcmwKpu3jnA_PcsD02TT";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ================================
// FORMULAIRE CONTACT
// ================================

const contactForm = document.querySelector("form");
// Protection anti-spam simple
let dernierEnvoi = 0;
if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();
const maintenant = Date.now();

if (maintenant - dernierEnvoi < 30000) {
    alert("Veuillez patienter quelques secondes avant de renvoyer un message.");
    return;
}
        const nom =
            contactForm.querySelector('input[type="text"]')?.value || "";

        const email =
            contactForm.querySelector('input[type="email"]')?.value || "";

        const telephone =
            contactForm.querySelector('input[type="tel"]')?.value || "";

        const message =
            contactForm.querySelector("textarea")?.value || "";
// ================================
// VALIDATION DU FORMULAIRE
// ================================

if (!nom.trim()) {
    alert("Veuillez entrer votre nom.");
    return;
}

if (!telephone.trim()) {
    alert("Veuillez entrer votre numéro de téléphone.");
    return;
}

if (!email.trim()) {
    alert("Veuillez entrer votre adresse email.");
    return;
}

if (!message.trim()) {
    alert("Veuillez écrire votre message.");
    return;
}

if (message.trim().length < 10) {
    alert("Votre message doit contenir au moins 10 caractères.");
    return;
}

dernierEnvoi = Date.now();

const submitButton = contactForm.querySelector('button[type="submit"]');
if (submitButton) {
    submitButton.textContent = "Envoi en cours...";
    submitButton.disabled = true;
}
        const successMessage =
            document.getElementById("successMessage");

        const turnstileToken = window.turnstile?.getResponse();

if (!turnstileToken) {
    alert("Veuillez effectuer la vérification anti-robot.");
    return;
}

const response = await fetch(
    "https://bkmhffpzhdhxrgxkinkk.supabase.co/functions/v1/swift-api",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nom: nom,
            telephone: telephone,
            email: email,
            message: message,
            turnstileToken: turnstileToken
        })
    }
);

const result = await response.json();

const error = response.ok
    ? null
    : { message: result.error || "Erreur lors de l'envoi." };

        if (error) {

            console.error("Erreur Supabase :", error);

            if (successMessage) {
                successMessage.textContent =
                    "Une erreur est survenue. Votre message n'a pas pu être envoyé.";
            }
if (submitButton) {
    submitButton.textContent = "Envoyer";
    submitButton.disabled = false;
}
          if (window.turnstile) {
    window.turnstile.reset();
}
            return;
        }

        if (successMessage) {
            successMessage.textContent =
                "✓ Merci ! Votre message a bien été envoyé.";
        }

                contactForm.reset();
      if (window.turnstile) {
    window.turnstile.reset();
}

        if (submitButton) {
            submitButton.textContent = "Envoyer";
            submitButton.disabled = false;
        }

    });

}