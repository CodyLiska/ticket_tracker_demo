document.getElementById('issueInputForm').addEventListener('submit', saveIssue)

function fetchIssues() {
  let issues = JSON.parse(localStorage.getItem('issues'))
  let issuesList = document.getElementById('issuesList')
  console.log(issues)

  issuesList.innerHTML = '';

  for(let i = 0; i < issues.length; i++) {
    let id = issues[i].id
    let subject = issues[i].subject
    let description = issues[i].description
    let severity = issues[i].severity
    let assignedTo = issues[i].assignedTo
    let status = issues[i].status
    let statusColor = status == 'Closed' ? 'badge badge-success' : 'badge badge-info'

    // TODO: refactor below to use a template language ejs or handlebars
    issuesList.innerHTML += 
    '<div class="card card-body bg-light mt-3">' + 
    '<h6>Issue ID:' + id + '</h6>' +
    '<p><span class= "badge ' + statusColor + ' ">' + status + '</span></p>' +
    '<h3>' + subject + '</h3>' +
    '<p>' + description + '</p>' + 
    '<p><i class="bi bi-clock-fill"></i> ' + severity + ' ' + '<i class="bi bi-person-fill"></i>' + assignedTo + '</p>' +
    '<div class="btn-toolbar">' +
    '<a href="#" class="btn btn-warning mr-1" onclick="setStatusClosed(\''+id+'\')">Close</a> ' +
    '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a> ' +
    '</div>'
    + '</div>'
  }
}

function saveIssue(e) {
  let issueId = chance.guid()
  let issueSubject = document.getElementById('issueSubjInput').value
  let issueDesc = document.getElementById('issueDescInput').value
  let issueSeverity = document.getElementById('issueSeverityInput').value
  let issueAssignedTo = document.getElementById('issueAssignedToInput').value
  let issueStatus = 'Open'

  let issue = {
    id: issueId,
    subject: issueSubject,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  if(localStorage.getItem('issues') === null) {
    let issues = []  // if first time using or no issues exist, create an empty issues array, push issue to it, then stringify
    issues.push(issue)
    localStorage.setItem('issues', JSON.stringify(issues))
  } else { // if there are already issues entered then, pull down the existing issues, add new issue to it, then stringify
    let issues = JSON.parse(localStorage.getItem('issues'))
    issues.push(issue)
    localStorage.setItem('issues', JSON.stringify(issues))
  }

  document.getElementById('issueInputForm').reset()  // reset form after add btn clicked
  
  fetchIssues() // gets all issues and displays them

  e.preventDefault() // since we aren't submitting anything to a server this is needed to prevent any extra actions we don't need
}

function setStatusClosed(id) {
  let issues = JSON.parse(localStorage.getItem('issues'))
  for(let i = 0; i < issues.length; i++) {
    if(issues[i].id === id) {
      issues[i].status = "Closed"
    }
  }

  // TODO: make a new function that will setItem and fetchIssues() and replace these 2 lines
  localStorage.setItem('issues', JSON.stringify(issues))  

  fetchIssues()
}

function deleteIssue(id) {
  let issues = JSON.parse(localStorage.getItem('issues'))
  for(let i = 0; i < issues.length; i++) {
    if(issues[i].id === id) {
      issues.splice(i,1)
    }
  }
  
  // TODO: make a new function that will setItem and fetchIssues() and replace these 2 lines
  localStorage.setItem('issues', JSON.stringify(issues))

  fetchIssues()
}