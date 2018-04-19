
///////////////////////////////////////
//       Game
///////////////////////////////////////


$('.game__answer').click(function(e){
  e.preventDefault();

  var parent = $('.game'),
      questions = $('.game__questions'),
      question_number = $(this).attr('data-question'),
      question_answer = $(this).attr('data-answer'),
      question_answer_description = $(this).attr('data-answer-description'),
      result = $('.game__result');


  /* SAVE RESULTS */
  // save results from the questions onto the #result element
  result.attr("data-question-" + question_number, question_answer);


  /* RESULT STRING */
  // form result description sentence
  $('.game__complete-text .q'+question_number).html(question_answer_description);


  /* GO TO NEXT Q */
  var current_question = questions.find('.game__question--active');
  var next_question = current_question.next('.game__question');
  current_question.fadeOut().removeClass('game__question--active');
  next_question.fadeIn().addClass('game__question--active');


  /* REVEAL OFFER RESULTS */
  // if last question answered, find resulting offers
  if( next_question.length == 0 ) {
    parent.addClass('game--complete');

    // answers
    var resultanswer1 = result.attr('data-question-1'),
        resultanswer2 = result.attr('data-question-2'),
        resultanswer3 = result.attr('data-question-3'),
        resultanswer4 = result.attr('data-question-4'),
        resultanswer5 = result.attr('data-question-5'),
        resultanswer6 = result.attr('data-question-6');

    /* OFFER FILTER */
    // if (correct answer, or pass this question)
    $('.offer').each(function(){
      if(
        ($(this).attr('data-q1') == resultanswer1 || $(this).attr('data-q1') == 'pass') &&
        ($(this).attr('data-q2') == resultanswer2 || $(this).attr('data-q2') == 'pass') &&
        ($(this).attr('data-q3') == resultanswer3 || $(this).attr('data-q3') == 'pass') &&
        ($(this).attr('data-q4') == resultanswer4 || $(this).attr('data-q4') == 'pass') &&
        ($(this).attr('data-q5') == resultanswer5 || $(this).attr('data-q5') == 'pass')
      ){
        $(this).addClass('offer--selected');
      }else{
        $(this).addClass('offer--eliminated');
      }
    });

  }

});

/* RESET GAME */
$('.game__reset').click(function(e){
  e.preventDefault();

  var parent = $('.game'),
      questions = $('.game__questions'),
      result = $('.game__result');

  var current_question = questions.find('.game__question--active');
  var first_question = $('.game__question').first();
  current_question.removeClass('game__question--active');
  first_question.show().addClass('game__question--active');

  result.removeAttr('data-question-1');
  result.removeAttr('data-question-2');
  result.removeAttr('data-question-3');
  result.removeAttr('data-question-4');
  result.removeAttr('data-question-5');

  $('.offer').removeClass('offer--selected');
  $('.offer').removeClass('offer--eliminated');

  parent.removeClass('game--complete');
  parent.removeClass('game--viewoffers');
});

/* VIEW ALL OFFERS */
$('.game__viewoffers').click(function(e){
  e.preventDefault();

  var parent = $('.game'),
      questions = $('.game__questions'),
      result = $('.game__result');

  $('.game__question--active').removeClass('game__question--active').hide();
  $('.game__question').first().addClass('game__question--active').show();

  result.removeAttr('data-question-1');
  result.removeAttr('data-question-2');
  result.removeAttr('data-question-3');
  result.removeAttr('data-question-4');
  result.removeAttr('data-question-5');

  $('.offer').removeClass('offer--selected');
  $('.offer').removeClass('offer--eliminated');

  parent.addClass('game--complete');
  parent.addClass('game--viewoffers');
});