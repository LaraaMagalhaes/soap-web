const calendarTitle = document.getElementById("calendar-title");
const calendarBody = document.getElementById("calendar-body");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7; // Começando na segunda

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks = [];
  let day = 1 - startDay;

  for (let i = 0; i < 6; i++) {
    let week = "<tr>";
    for (let j = 0; j < 7; j++) {
      if (day > 0 && day <= daysInMonth) {
        week += `<td class="day-cell" data-day="${day}">${day}</td>`;
      } else {
        week += "<td></td>";
      }
      day++;
    }
    week += "</tr>";
    weeks.push(week);
  }

  calendarBody.innerHTML = weeks.join("");
  calendarTitle.textContent = `${getMonthName(month)} ${year}`;

  addDayClickEvents();
}

function getMonthName(monthIndex) {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  return months[monthIndex];
}

function addDayClickEvents() {
  document.querySelectorAll(".day-cell").forEach((cell) => {
    cell.addEventListener("click", () => {
      document.querySelectorAll(".day-cell").forEach((c) =>
        c.classList.remove("selected")
      );
      cell.classList.add("selected");
    });
  });
}

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);
