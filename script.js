// Questions fun et drôles pour le jeu amoureux
const questions = [
    {
        question: "wache nouhaila katbghi omar",
        type: "yesno", // Oui/Non
        correctAnswer: "oui"
    },
    {
        question: "chekoun l messeti fina ou l hma9e",
        type: "ana-nta", // Ana/Nta
        correctAnswer: "ana"
    },
    {
        question: "wache ana",
        type: "multiple", // 4 réponses
        answers: ["hobk", "kebida", "rajlk", "zmanek"]
    },
    {
        question: "chekoun l 3assabi fina",
        type: "ana-nta-2", // Ana/Nta avec animation spéciale pour nta
        correctAnswer: "ana"
    }
];

let currentQuestion = 0;
let score = 0;
let gameStarted = false;

function startGame() {
    try {
        gameStarted = true;
        currentQuestion = 0;
        score = 0;
        
        const startScreen = document.getElementById('startScreen');
        const gameScreen = document.getElementById('gameScreen');
        
        if (!startScreen || !gameScreen) {
            console.error('Les éléments startScreen ou gameScreen sont introuvables');
            return;
        }
        
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        showQuestion();
    } catch (error) {
        console.error('Erreur dans startGame:', error);
        alert('Une erreur est survenue. Veuillez recharger la page.');
    }
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        showResults();
        return;
    }

    const question = questions[currentQuestion];
    document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1}`;
    document.getElementById('questionText').textContent = question.question;
    
    // Cacher l'animation précédente
    document.getElementById('animationContainer').innerHTML = '';
    document.getElementById('animationContainer').classList.remove('show');
    
    // Cacher tous les lightbox s'ils existent
    const lightboxIds = ['angryLightbox', 'kissLightbox', 'cryLightbox', 'jerryLightbox', 'messiLightbox', 'koreanLightbox'];
    lightboxIds.forEach(id => {
        const existingLightbox = document.getElementById(id);
        if (existingLightbox) {
            existingLightbox.remove();
        }
    });
    
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    // Créer les boutons selon le type de question
    if (question.type === "yesno") {
        const ouiBtn = document.createElement('button');
        ouiBtn.className = 'answer-btn yes-btn';
        ouiBtn.textContent = 'Oui';
        ouiBtn.onclick = () => selectAnswer('oui');
        answersContainer.appendChild(ouiBtn);
        
        const nonBtn = document.createElement('button');
        nonBtn.className = 'answer-btn no-btn';
        nonBtn.textContent = 'Non';
        nonBtn.onclick = () => selectAnswer('non');
        answersContainer.appendChild(nonBtn);
    } else if (question.type === "ana-nta" || question.type === "ana-nta-2") {
        const anaBtn = document.createElement('button');
        anaBtn.className = 'answer-btn yes-btn';
        anaBtn.textContent = 'Ana';
        anaBtn.onclick = () => selectAnswer('ana');
        answersContainer.appendChild(anaBtn);
        
        const ntaBtn = document.createElement('button');
        ntaBtn.className = 'answer-btn no-btn';
        ntaBtn.textContent = 'Nta';
        ntaBtn.onclick = () => selectAnswer('nta');
        answersContainer.appendChild(ntaBtn);
    } else if (question.type === "multiple") {
        // Créer 4 boutons pour les réponses multiples
        question.answers.forEach((answer, index) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            // Alterner les couleurs
            if (index % 2 === 0) {
                btn.classList.add('yes-btn');
            } else {
                btn.classList.add('no-btn');
            }
            btn.textContent = answer;
            btn.onclick = () => selectAnswer(answer);
            answersContainer.appendChild(btn);
        });
    }
    
    updateProgress();
}

function selectAnswer(answer) {
    const question = questions[currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');
    const animationContainer = document.getElementById('animationContainer');
    
    // Désactiver tous les boutons
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    // Gérer les réponses selon le type de question
    if (question.type === "yesno") {
        if (answer === 'oui') {
            showKissAnimation();
            if (question.correctAnswer === 'oui') {
                score++;
                buttons[0].style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
                buttons[0].style.color = 'white';
                buttons[0].style.borderColor = '#4caf50';
            } else {
                buttons[0].style.background = 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
                buttons[0].style.color = 'white';
                buttons[0].style.borderColor = '#f44336';
            }
        } else {
            showCryAnimation();
            if (question.correctAnswer === 'non') {
                score++;
                buttons[1].style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
                buttons[1].style.color = 'white';
                buttons[1].style.borderColor = '#4caf50';
            } else {
                buttons[1].style.background = 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
                buttons[1].style.color = 'white';
                buttons[1].style.borderColor = '#f44336';
            }
        }
        
        // Passer à la question suivante après 3 secondes
        setTimeout(() => {
            currentQuestion++;
            showQuestion();
        }, 3000);
    } else if (question.type === "ana-nta") {
        if (answer === 'ana') {
            // Animation avec jerry.png
            showJerryAnimation();
            score++;
            buttons[0].style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
            buttons[0].style.color = 'white';
            buttons[0].style.borderColor = '#4caf50';
            
            setTimeout(() => {
                currentQuestion++;
                showQuestion();
            }, 3000);
        } else if (answer === 'nta') {
            // Animation spéciale avec catangry.gif
            showAngryAnimation();
            buttons[1].style.background = 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
            buttons[1].style.color = 'white';
            buttons[1].style.borderColor = '#f44336';
            
            // Passer à la question suivante après l'animation (environ 5 secondes)
            setTimeout(() => {
                currentQuestion++;
                showQuestion();
            }, 5000);
        }
    } else if (question.type === "ana-nta-2") {
        if (answer === 'ana') {
            // Animation avec jerry.png (même que question 2)
            showJerryAnimation();
            score++;
            buttons[0].style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
            buttons[0].style.color = 'white';
            buttons[0].style.borderColor = '#4caf50';
            
            setTimeout(() => {
                currentQuestion++;
                showQuestion();
            }, 3000);
        } else if (answer === 'nta') {
            // Animation avec korean.png
            showKoreanAnimation();
            buttons[1].style.background = 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
            buttons[1].style.color = 'white';
            buttons[1].style.borderColor = '#f44336';
            
            setTimeout(() => {
                currentQuestion++;
                showQuestion();
            }, 3000);
        }
    } else if (question.type === "multiple") {
        // Peu importe la réponse, afficher messi.png
        const selectedButton = Array.from(buttons).find(btn => btn.textContent === answer);
        if (selectedButton) {
            selectedButton.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
            selectedButton.style.color = 'white';
            selectedButton.style.borderColor = '#4caf50';
        }
        
        // Désactiver tous les boutons
        buttons.forEach(btn => {
            btn.style.pointerEvents = 'none';
        });
        
        // Afficher l'animation avec messi.png
        showMessiAnimation();
        score++;
        
        // Passer à la question suivante après 3 secondes
        setTimeout(() => {
            currentQuestion++;
            showQuestion();
        }, 3000);
    }
}

function showKissAnimation() {
    // Créer un lightbox pour afficher l'image en plein écran
    const lightbox = document.createElement('div');
    lightbox.id = 'kissLightbox';
    lightbox.className = 'angry-lightbox';
    
    const gifPath = "images/Akshay Kumar GIF - Akshay Kumar Filmyvibes - Discover & Share GIFs.gif";
    lightbox.innerHTML = `
        <div class="angry-content">
            <img src="${gifPath}" alt="Omar" class="angry-gif" />
            <div class="angry-text second-text">Bayna</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Afficher
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 100);
    
    // Faire disparaître après 3 secondes
    setTimeout(() => {
        lightbox.classList.remove('show');
        lightbox.classList.add('hide');
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 500);
    }, 3000);
}

function showCryAnimation() {
    // Créer un lightbox pour afficher l'image en plein écran
    const lightbox = document.createElement('div');
    lightbox.id = 'cryLightbox';
    lightbox.className = 'angry-lightbox';
    
    lightbox.innerHTML = `
        <div class="angry-content">
            <img src="images/catface.png" alt="Surprise" class="angry-gif" />
            <div class="angry-text first-text">kent 3arfha</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Afficher
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 100);
    
    // Faire disparaître après 3 secondes
    setTimeout(() => {
        lightbox.classList.remove('show');
        lightbox.classList.add('hide');
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 500);
    }, 3000);
}

function showJerryAnimation() {
    // Créer un lightbox pour afficher l'image en plein écran
    const lightbox = document.createElement('div');
    lightbox.id = 'jerryLightbox';
    lightbox.className = 'angry-lightbox';
    
    lightbox.innerHTML = `
        <div class="angry-content">
            <img src="images/jerry.png" alt="Jerry" class="angry-gif" />
            <div class="angry-text second-text">3arfa rassek</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Afficher
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 100);
    
    // Faire disparaître après 3 secondes
    setTimeout(() => {
        lightbox.classList.remove('show');
        lightbox.classList.add('hide');
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 500);
    }, 3000);
}

function showMessiAnimation() {
    // Créer un lightbox pour afficher l'image en plein écran
    const lightbox = document.createElement('div');
    lightbox.id = 'messiLightbox';
    lightbox.className = 'angry-lightbox';
    
    lightbox.innerHTML = `
        <div class="angry-content">
            <img src="images/messi.png" alt="Messi" class="angry-gif" />
            <div class="angry-text second-text">zamani a hessen wahda</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Afficher
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 100);
    
    // Faire disparaître après 3 secondes
    setTimeout(() => {
        lightbox.classList.remove('show');
        lightbox.classList.add('hide');
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 500);
    }, 3000);
}

function showKoreanAnimation() {
    // Créer un lightbox pour afficher l'image en plein écran
    const lightbox = document.createElement('div');
    lightbox.id = 'koreanLightbox';
    lightbox.className = 'angry-lightbox';
    
    lightbox.innerHTML = `
        <div class="angry-content">
            <img src="images/korean.png" alt="Korean" class="angry-gif" />
            <div class="angry-text second-text">saraha ana</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Afficher
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 100);
    
    // Faire disparaître après 3 secondes
    setTimeout(() => {
        lightbox.classList.remove('show');
        lightbox.classList.add('hide');
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 500);
    }, 3000);
}

function showAngryAnimation() {
    // Créer un lightbox pour afficher l'image en plein écran
    const lightbox = document.createElement('div');
    lightbox.id = 'angryLightbox';
    lightbox.className = 'angry-lightbox';
    
    // Première apparition avec catangry2.png et "ana hma9e o messeti"
    lightbox.innerHTML = `
        <div class="angry-content">
            <img src="images/catangry2.png" alt="Angry Cat" class="angry-gif" />
            <div class="angry-text first-text">ana hma9e o messeti</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Afficher la première fois (catangry2.png)
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 100);
    
    // Faire disparaître après 2 secondes
    setTimeout(() => {
        lightbox.classList.remove('show');
        lightbox.classList.add('hide');
    }, 2000);
    
    // Réafficher avec catangry.gif et "wakha" après 1 seconde de pause (donc à 3 secondes)
    setTimeout(() => {
        lightbox.innerHTML = `
            <div class="angry-content">
                <img src="images/catangry.gif" alt="Angry Cat" class="angry-gif" />
                <div class="angry-text second-text">wakha</div>
            </div>
        `;
        lightbox.classList.remove('hide');
        lightbox.classList.add('show');
    }, 3000);
    
    // Faire disparaître définitivement après 2 secondes supplémentaires
    setTimeout(() => {
        lightbox.classList.remove('show');
        lightbox.classList.add('hide');
        setTimeout(() => {
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 500);
    }, 5000);
}

function updateProgress() {
    const progress = ((currentQuestion) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function showResults() {
    document.getElementById('gameScreen').classList.add('hidden');
    document.getElementById('resultScreen').classList.remove('hidden');
    
    // Animation d'apparition des photos
    const photos = document.querySelectorAll('.photo-image');
    photos.forEach((photo, index) => {
        setTimeout(() => {
            photo.style.opacity = '0';
            photo.style.transform = 'scale(0.8) translateY(20px)';
            setTimeout(() => {
                photo.style.transition = 'all 0.8s ease-out';
                photo.style.opacity = '1';
                photo.style.transform = 'scale(1) translateY(0)';
            }, 100);
        }, index * 300);
    });
    
    // Après 5 secondes, afficher la vidéo
    setTimeout(() => {
        document.getElementById('resultScreen').classList.add('hidden');
        document.getElementById('videoScreen').classList.remove('hidden');
        
        // Lancer la vidéo
        const video = document.getElementById('nouhailaVideo');
        setupVideoControls(video);
        video.play().catch(e => {
            console.log("La vidéo ne peut pas être lue automatiquement:", e);
        });
    }, 5000);
}

function setupVideoControls(video) {
    const progressBar = document.querySelector('.video-progress-bar');
    const progressFill = document.querySelector('.video-progress-fill');
    const timeCurrent = document.querySelector('.time-current');
    const timeTotal = document.querySelector('.time-total');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    // Mettre à jour la durée totale
    video.addEventListener('loadedmetadata', () => {
        timeTotal.textContent = formatTime(video.duration);
    });
    
    // Mettre à jour la progression
    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressFill.style.width = progress + '%';
        timeCurrent.textContent = formatTime(video.currentTime);
    });
    
    // Quand la vidéo se termine, afficher la lettre d'amour
    video.addEventListener('ended', () => {
        setTimeout(() => {
            showLoveLetter();
        }, 1000);
    });
    
    // Clic sur la barre de progression
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
    });
    
    // Bouton play/pause
    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = '⏸';
        } else {
            video.pause();
            playPauseBtn.textContent = '▶';
        }
    });
    
    // Mettre à jour le bouton quand la vidéo joue/pause
    video.addEventListener('play', () => {
        playPauseBtn.textContent = '⏸';
    });
    
    video.addEventListener('pause', () => {
        playPauseBtn.textContent = '▶';
    });
    
    // Bouton repeat (rejouer la vidéo)
    const repeatBtn = document.getElementById('repeatBtn');
    if (repeatBtn) {
        repeatBtn.addEventListener('click', () => {
            video.currentTime = 0;
            video.play();
        });
    }
    
    // Bouton previous (reculer de 10 secondes)
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            video.currentTime = Math.max(0, video.currentTime - 10);
        });
    }
    
    // Bouton next (avancer de 10 secondes)
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            video.currentTime = Math.min(video.duration, video.currentTime + 10);
        });
    }
    
    // Bouton like (animation)
    const likeBtn = document.getElementById('likeBtn');
    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            likeBtn.style.transform = 'scale(1.3)';
            setTimeout(() => {
                likeBtn.style.transform = 'scale(1)';
            }, 200);
        });
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function showLoveLetter() {
    const videoScreen = document.getElementById('videoScreen');
    const loveLetterScreen = document.getElementById('loveLetterScreen');
    
    if (videoScreen) videoScreen.classList.add('hidden');
    if (loveLetterScreen) {
        loveLetterScreen.classList.remove('hidden');
        
        // Animation d'apparition de la lettre
        const letterPaper = loveLetterScreen.querySelector('.love-letter-paper');
        if (letterPaper) {
            letterPaper.style.opacity = '0';
            letterPaper.style.transform = 'scale(0.8) translateY(30px)';
            setTimeout(() => {
                letterPaper.style.transition = 'all 1s ease-out';
                letterPaper.style.opacity = '1';
                letterPaper.style.transform = 'scale(1) translateY(0)';
            }, 100);
        }
    }
}

function restartGame() {
    try {
        // Réinitialiser l'état du jeu
        currentQuestion = 0;
        score = 0;
        gameStarted = false;
        
        // Cacher tous les écrans
        const resultScreen = document.getElementById('resultScreen');
        const videoScreen = document.getElementById('videoScreen');
        const gameScreen = document.getElementById('gameScreen');
        const startScreen = document.getElementById('startScreen');
        const loveLetterScreen = document.getElementById('loveLetterScreen');
        
        if (resultScreen) resultScreen.classList.add('hidden');
        if (videoScreen) videoScreen.classList.add('hidden');
        if (gameScreen) gameScreen.classList.add('hidden');
        if (loveLetterScreen) loveLetterScreen.classList.add('hidden');
        if (startScreen) startScreen.classList.remove('hidden');
        
        // Arrêter la vidéo si elle est en cours
        const video = document.getElementById('nouhailaVideo');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        
        // Réinitialiser la barre de progression
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = '0%';
        }
        
        // Nettoyer les animations
        const animationContainer = document.getElementById('animationContainer');
        if (animationContainer) {
            animationContainer.innerHTML = '';
            animationContainer.classList.remove('show');
        }
        
        // Supprimer tous les lightbox s'ils existent
        const lightboxIds = ['angryLightbox', 'kissLightbox', 'cryLightbox', 'jerryLightbox', 'messiLightbox', 'koreanLightbox'];
        lightboxIds.forEach(id => {
            const existingLightbox = document.getElementById(id);
            if (existingLightbox) {
                existingLightbox.remove();
            }
        });
    } catch (error) {
        console.error('Erreur dans restartGame:', error);
    }
}

// Animation des cœurs en arrière-plan
function createFloatingHearts() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        heart.textContent = ['💕', '💖', '❤️', '💗', '💝'][Math.floor(Math.random() * 5)];
    });
}

createFloatingHearts();
setInterval(createFloatingHearts, 3000);

// Initialiser les boutons "Rejouer" au chargement de la page
window.addEventListener('DOMContentLoaded', function() {
    // Bouton restart dans resultScreen
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartGame);
        // Retirer la classe hidden pour que le bouton soit visible si nécessaire
        // (actuellement il est hidden dans le HTML, donc on le laisse tel quel)
    }
    
    // Bouton restart dans videoScreen (déjà géré par onclick dans HTML, mais on ajoute aussi addEventListener)
    const restartBtnSpotify = document.querySelector('.btn-restart-spotify');
    if (restartBtnSpotify) {
        restartBtnSpotify.addEventListener('click', restartGame);
    }
    
    // Bouton restart dans loveLetterScreen
    const loveLetterScreen = document.getElementById('loveLetterScreen');
    if (loveLetterScreen) {
        const restartBtnInLetter = loveLetterScreen.querySelector('.btn-restart');
        if (restartBtnInLetter) {
            restartBtnInLetter.addEventListener('click', restartGame);
        }
    }
});

