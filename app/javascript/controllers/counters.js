document.addEventListener('DOMContentLoaded', function() {
  console.log('Button clicked!');
  var increaseButtons = document.querySelectorAll('.increase-button');
  var decreaseButtons = document.querySelectorAll('.decrease-button');

  function updateCounter(counterId, newValue) {
    fetch(`/counters/${counterId}/update_count`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
      },
      body: JSON.stringify({ count: newValue })
    });
  }

  increaseButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var counterId = this.id.replace('increase-button-', '');
      var counterValueElement = document.getElementById('counter-value-' + counterId);
      var counterValue = parseInt(counterValueElement.textContent) + 1;
      counterValueElement.textContent = counterValue;
      updateCounter(counterId, counterValue);
    });
  });

  decreaseButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var counterId = this.id.replace('decrease-button-', '');
      var counterValueElement = document.getElementById('counter-value-' + counterId);
      var counterValue = parseInt(counterValueElement.textContent) - 1;
      if (counterValue >= 0) {
        counterValueElement.textContent = counterValue;
        updateCounter(counterId, counterValue);
      }
    });
  });
});
