(function (){
  var currentQuestion = 0;
  var currentAnswer = [];
  var answers = [];
  var questionsList = [{
    "statement": "Que signifie binaire ?",
    "answers" : [{
      "text": "Composé de 1 élément",
      "valid": false
    }, {
      "text": "Composé de 2 éléments",
      "valid": true
    }, {
      "text": "Composé de 3 éléments",
      "valid": false
    }, {
      "text": "Composé de 5 éléments",
      "valid": false
    }, {
      "text": "Composé de 10 éléments",
      "valid": true
    }, {
      "text": "Composé de 16 éléments",
      "valid": false
    }]
  }, {
    "statement": "Qui a crée le langage C++ au cours des années 1980 ?",
    "answers" : [{
      "text": "Steve Jobs",
      "valid": false
    }, {
      "text": "Bjarne Stroustrup",
      "valid": true
    }, {
      "text": "Linus Torvalds",
      "valid": false
    }, {
      "text": "Alan Turing",
      "valid": false
    }]
  }, {
    "statement": "L'extension de fichier .svg correspond à quels fichiers ?",
    "answers" : [{
      "text": "Des pages web",
      "valid": false
    }, {
      "text": "Des bases de données",
      "valid": false
    }, {
      "text": "Des fichiers archives",
      "valid": false
    }, {
      "text": "Des images vectorielles",
      "valid": true
    }, {
      "text": "L'extension .svg n'existe pas",
      "valid": false
    }]
  }];

  function afficherQuestion(index) {
    var question = questionsList[index];
    // mettre à jour l'énoncé de la question
    var statement = document.querySelector('.question-statement');
    statement.innerHTML = question.statement;

    // mettre à jour la liste des réponses possibles
    var element = document.querySelector('.question-answers');
    while(element.firstChild) {  // répète tant qu'il y a un élément fils
      element.removeChild(element.firstChild); // retire le premier élément
    }
    // ajoute les nouvelles réponses une par une
    question.answers.forEach(function (r, idx) {
      var r1 = document.createElement('div');        // crée un élément <div>
      r1.classList.add('answer');                    // ajoute class="answer"
      r1.onclick = function(evt) {
        if(r1.classList.contains('active')){
          r1.classList.remove('active');
          currentAnswer.splice(currentAnswer.indexOf(idx), 1);
        } else {
          r1.classList.add('active');
          currentAnswer.push(idx);
        }
      };
      var r1content = document.createElement('div'); // crée l'élément <div> à l'intérieur
      r1content.classList.add('answer-text');        // ajoute class="answer-text"
      r1content.innerHTML = r.text;                  // défini le contenu
      r1.appendChild(r1content);                     // ajoute le texte dans la réponse
      element.appendChild(r1);                       // ajoute la réponse dans la liste de réponses
    });
  }

  function afficherResultat(){
    var score = 0;
    var total = 0;

    questionsList.forEach(function(question, idx){
      var ok = true;
      var myanswer = answers[idx];
      total++;

      // pour que la réponse soit correct il faut que
      // toutes les réponses données soient correctes
      myanswer.forEach(function(v){
        if(question.answers[v].valid != true){
          ok = false;
        }
      });
      // et il faut aussi que toutes les réponses
      // correctes soient données
      question.answers.forEach(function(a, idx){
        if(a.valid){
          if(myanswer.indexOf(idx) < 0){
            ok = false;
          }
        }
      });
      if(ok) { score++; }
    });

    var overlay = document.querySelector('.overlay');
    var scoreText = overlay.querySelector('.result .content');
    scoreText.innerHTML = 'Score : ' + score + ' / ' + total;
    overlay.classList.add('active');
  }

  var valider = document.querySelector('.question button');
  valider.onclick = function() {
    answers.push(currentAnswer);
    currentAnswer = [];
    currentQuestion += 1;
    if(currentQuestion < questionsList.length) {
      afficherQuestion(currentQuestion);
    } else {
      afficherResultat();
    }
  };

  afficherQuestion(currentQuestion);
})();