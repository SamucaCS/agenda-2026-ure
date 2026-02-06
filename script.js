
const daysContainer = document.getElementById("daysContainer");
const monthDisplay = document.getElementById("currentMonthYear");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
const eventList = document.getElementById("eventList");
const selectedDateDisplay = document.getElementById("selectedDateDisplay");
let currentDate = new Date(2026, 0, 1);
let selectedDay = null;

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const weekDays = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];
// teste
const eventsDatabase = {
  "3-2-2026": ["Entrevista do Dirigente com os Diretores Escolares na Ure - Suzano"],
  "5-2-2026": ["Reunião do Dirigente com os Diretores - Etec Ferraz de Vasconcelos"],
  "6-2-2026": ["Atribuição projeto Páscoa - ZEIKICHI FUKUOKA "],
  "4-2-2026": ["Reunião do Dirigente com os chefes de setores "],
};

function renderCalendar() {
  daysContainer.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  monthDisplay.innerText = `${months[month]} ${year}`;
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  const daysInPrevMonth = prevLastDay.getDate();
  const startDayIndex = firstDay.getDay();
  for (let i = startDayIndex; i > 0; i--) {
    const div = document.createElement("div");
    div.classList.add("day", "other-month");
    div.innerText = daysInPrevMonth - i + 1;
    daysContainer.appendChild(div);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const div = document.createElement("div");
    div.classList.add("day");
    div.innerText = i;

    const dateKey = `${i}-${month + 1}-${year}`;
    if (eventsDatabase[dateKey]) {
      div.classList.add("has-event");
    }

    div.addEventListener("click", () => {
      document
        .querySelectorAll(".day")
        .forEach((d) => d.classList.remove("active"));
      div.classList.add("active");
      updateSidebar(i, month, year);
    });

    daysContainer.appendChild(div);
  }

  const totalCells = startDayIndex + daysInMonth;
  const nextDays = 42 - totalCells;

  for (let i = 1; i <= nextDays; i++) {
    const div = document.createElement("div");
    div.classList.add("day", "other-month");
    div.innerText = i;
    daysContainer.appendChild(div);
  }
}

function updateSidebar(day, month, year) {
  const dateObj = new Date(year, month, day);
  const weekDayName = weekDays[dateObj.getDay()];
  selectedDateDisplay.innerHTML = `<strong>${weekDayName}</strong><br>${day} de ${months[month]}`;

  const dateKey = `${day}-${month + 1}-${year}`;
  const events = eventsDatabase[dateKey];

  eventList.innerHTML = "";

  if (events && events.length > 0) {
    events.forEach((ev) => {
      const card = document.createElement("div");
      card.classList.add("event-card");
      card.innerHTML = `<span>${ev}</span>`;
      eventList.appendChild(card);
    });
  } else {
    eventList.innerHTML = `<p class="empty-msg">Nenhum evento para este dia.</p>`;
  }
}

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
updateSidebar(1, 0, 2026);
