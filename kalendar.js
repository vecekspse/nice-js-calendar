'use strict'
class Kalendar {
    constructor(element) {
        this.today = new Date()
        this.currentDay = this.today.getDate()
        this.currentMonth = this.today.getMonth()
        this.currentYear = this.today.getFullYear()
        this.dayNames = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota']
        this.monthNames = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec']
        this.activeDate = this.today
        this.element = element
    }
    calendar() {
        let table = document.createElement('table')
        table.appendChild(this.renderCalendarHead())
        table.appendChild(this.renderCalendarBody())
        table.appendChild(this.renderCalendarFooter())
        this.element.appendChild(table)   
        this.initiateControls()
    }
    renderCalendarHead() {
        let thead = document.createElement('thead')
        thead.innerHTML = this.renderCalendarHeadData()        
        return thead
    }
    renderCalendarHeadData() {
        return `<tr>
                  <th colspan="7">
                    <button type="button" class="prev">Předchozí měsíc</button>
                    <h2>${this.monthNames[this.activeDate.getMonth()]} (${this.activeDate.getFullYear()})</h2>
                    <button type="button" class="next">Následující měsíc</button>
                  </th>
                </tr>
                <tr>
                  ${this.dayNames.map(day => `<th>${day}</th>`).join('\n    ')}
                </tr>`
    }    
    renderCalendarBody() {
        let tbody = document.createElement('tbody')
        let activeDay = this.activeDate.getDate()
        let activeMonth = this.activeDate.getMonth()
        let activeYear = this.activeDate.getFullYear()
        let monthDays = new Date(activeYear, activeMonth + 1, 0)    
        monthDays = monthDays.getDate() 
        let monthStarts = new Date(activeYear, activeMonth, 1)        
        monthStarts = monthStarts.getDay()
        let previousMonthLastDay = new Date(activeYear, activeMonth, 0)
        previousMonthLastDay = previousMonthLastDay.getDate()
        let dayCounter = 1
        let nextMonthCounter = 1
        let calendarRows = Math.ceil((monthDays + monthStarts) / 7)
        let dataDate, year, month
        for(let i = 0; i < calendarRows; i++) {
            let tr = document.createElement('tr')
            for(let j = 0; j < 7; j++){
                if(monthStarts > 0) {
                    year = (activeMonth == 0) ? activeYear - 1 : activeYear               
                    month = (activeMonth == 0) ? 12 : activeMonth
                    dataDate = `${year}-${month}-${previousMonthLastDay-(monthStarts-1)}`
                    tr.innerHTML += `<td data-date="${dataDate}" class="previous-month">${previousMonthLastDay -(monthStarts-1)}</td>`
                    monthStarts--
                } else if(dayCounter <= monthDays){
                    dataDate = `${activeYear}-${activeMonth + 1}-${dayCounter}`
                    if(this.currentDay == dayCounter && this.currentMonth == activeMonth && this.currentYear == activeYear) {
                        tr.innerHTML += `<td data-date="${dataDate}" class="current-month current-day">${dayCounter++}</td>`
                    } else {
                        tr.innerHTML += `<td data-date="${dataDate}" class="current-month">${dayCounter++}</td>`
                    }
                } else {                
                    year = (activeMonth == 11) ? activeYear + 1: activeYear
                    month = (activeMonth == 11) ? 1 : activeMonth + 2
                    dataDate = `${year}-${month}-${nextMonthCounter}`
                    tr.innerHTML += `<td data-date="${dataDate}" class="next-month">${nextMonthCounter++}</td>`
                }                
            }            
            tbody.appendChild(tr)
        }
        return tbody
    }   
    renderCalendarFooter() {
        let tfoot = document.createElement('tfoot')
        tfoot.innerHTML = `<tr><td colspan="7" class="date-preview"></td></tr>`
        return tfoot
    }
    initiateControls() {
        let prev = document.querySelector('.prev')
        let next = document.querySelector('.next')
        prev.addEventListener('click', () => {
            this.activeDate.setMonth(this.activeDate.getMonth() - 1, 1) 
            this.element.removeChild(this.element.firstChild)
            this.calendar(this.element)   
        })
        next.addEventListener('click', () => {
            this.activeDate.setMonth(this.activeDate.getMonth() + 1, 1)
            this.element.removeChild(this.element.firstChild)
            this.calendar(this.element) 
        })    
        let cells = document.querySelectorAll('.kalendar tbody td')
        let datePreview = this.element.querySelector('tfoot td.date-preview')
        for(let cell of cells) {
            cell.addEventListener('click', (e) => {
                let date = new Date(e.target.dataset.date);
                let card = `<h4>${date.getDate()}. ${this.monthNames[date.getMonth()]} ${date.getFullYear()}</h4>
                              <p>Tento den je ${this.dayNames[date.getDay()]}.</p>`              
                datePreview.innerHTML = card
            })
        }
    }
}
let kalendar = new Kalendar(document.querySelector('.kalendar'))
kalendar.calendar()