var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

function validateNextStep() {
  var parent_fieldset = $(this).parents('fieldset');
  var next_step = true;

  parent_fieldset.find('#amount').each(function() {
    var regExpression = new RegExp('\\d{1,}').test($(this).val());
    if (!regExpression || $(this).val().length > 10000) {
      $(this).addClass('input-error');
      next_step = false;
    } else {
      $(this).removeClass('input-error');
    }
  });
  parent_fieldset.find('#Period').each(function() {
    var regExpression = new RegExp('\\d{1,}').test($(this).val());
    if (!regExpression || $(this).val().length > 12) {
      $(this).addClass('input-error');
      next_step = false;
    } else {
      $(this).removeClass('input-error');
    }
  });
  parent_fieldset.find('#Code').each(function() {
    var regExpression = new RegExp('\\d{10}').test($(this).val());
    var getDays = $(this).val().slice(0, 5);
    var startYearCount = moment([1899, 11, 31]);
    var getBirth = startYearCount.add(getDays, 'days');
    var ageNow = getBirth.fromNow();
    var ageNowNumber = ageNow.replace(/[^\d,]/g, '');

    if (!regExpression || $(this).val().length > 10 || ageNowNumber < 21) {
      $(this).addClass('input-error');      
      next_step = false;
    } else {
      $(this).removeClass('input-error');
    }
  });
  parent_fieldset.find('#Surname').each(function() {
    var regExpression = new RegExp('\\D').test($(this).val());
    if (!regExpression) {
      $(this).addClass('input-error');
      next_step = false;
    } else {
      $(this).removeClass('input-error');
    }
  });
  parent_fieldset.find('#Name').each(function() {
    var regExpression = new RegExp('\\D').test($(this).val());
    if (!regExpression) {
      $(this).addClass('input-error');
      next_step = false;
    } else {
      $(this).removeClass('input-error');
    }
  });
  parent_fieldset.find('#City').each(function() {
    var regExpression = new RegExp('\\D').test($(this).val());
    if (!regExpression) {
      $(this).addClass('input-error');
      next_step = false;
    } else {
      $(this).removeClass('input-error');
    }
  });

  if (next_step) {
    if (animating) return false;
    animating = true;
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
    $('#progressbar li').eq($('fieldset').index(next_fs)).addClass('active');
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function(now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale current_fs down to 80%
          scale = 1 - (1 - now) * 0.2;
          //2. bring next_fs from the right(50%)
          left = now * 50 + '%';
          //3. increase opacity of next_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({ transform: 'scale(' + scale + ')' });
          next_fs.css({ left: left, opacity: opacity });
        },
        duration: 800,
        complete: function() {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
      }
    );
  }
}

jQuery(document).ready(function() {
  $('form input').each(function(index, item) {
    $(item).on('blur', validateNextStep);
  });

  $('#msform .next').on('click', validateNextStep);

  $('.previous').click(function() {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $('#progressbar li').eq($('fieldset').index(current_fs)).removeClass('active');

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function(now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale previous_fs from 80% to 100%
          scale = 0.8 + (1 - now) * 0.2;
          //2. take current_fs to the right(50%) - from 0%
          left = (1 - now) * 50 + '%';
          //3. increase opacity of previous_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({ left: left });
          previous_fs.css({ transform: 'scale(' + scale + ')', opacity: opacity });
        },
        duration: 800,
        complete: function() {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
      }
    );
  });
});
