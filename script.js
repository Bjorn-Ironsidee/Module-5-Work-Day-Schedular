$(function () {
  // Display current date in header
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);

  // Load saved events from local storage
  $(".description").each(function () {
    var id = $(this).parent().attr("id");
    var savedEvent = localStorage.getItem(id);
    if (savedEvent) {
      $(this).val(savedEvent);
    }
  });

  // Apply past, present, or future class to each time block
  function updateHourClasses() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      var hour = parseInt($(this).attr("id").split("-")[1]);
      if (hour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (hour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }
  updateHourClasses();

  // Update time block classes every minute
  setInterval(updateHourClasses, 60000);

  // Save event to local storage when save button is clicked
  $(".saveBtn").on("click", function () {
    var id = $(this).parent().attr("id");
    var description = $(this).siblings(".description").val().trim();
    localStorage.setItem(id, description);
  });
});
