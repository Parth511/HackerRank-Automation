const puppeteer = require('puppeteer');
const codeObj = require('./code')

const loginLink = 'https://www.hackerrank.com/auth/login'
const email = 'your_email_id@not_stupid.com'
const password = 'MaybeYourPassword, IDK'

let browserOpen = puppeteer.launch({
    headless: false,
    args :['--start-maximized'],
    defaultViewport:null
})

let page

browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;
}).then(function(newTab){
    page = newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function(){
    let emailEntered = page.type("input[id='input-1']", email, {delay : 50})
    return emailEntered
}).then(function(){
    let passwordEntered = page.type("input[type='password']", password, {delay : 50})
    return passwordEntered
}).then(function(){
    let loginButtonClicked = page.click('button[data-analytics="LoginPassword"]', {delay: 50})
    return loginButtonClicked
}).then(function(){
    let waitForSelectorPromise = page.waitForSelector('.topic-name[data-automation="algorithms"]')
    return waitForSelectorPromise
}).then(function(){
    let clickOnAlgoPromise = page.click('.topic-name[data-automation="algorithms"]', page)
    return clickOnAlgoPromise
}).then(function(){
    let waitForSelectorPrmoise = page.waitForSelector("input[value='warmup']")
    return waitForSelectorPrmoise
}).then(function(){
    let getToWarmup = page.click("input[value='warmup']")
    return getToWarmup
}).then(function(){
    let waitFor3Seconds = page.waitFor(3000)
    waitFor3Seconds
}).then(function(){
    let allChallengesPromise = page.$$('.challenge-submit-btn', {delay : 50})
    return allChallengesPromise
}).then(function(questionsArr){
    console.log('number of questions: ', questionsArr.length)
    let questionWillBeSolved = questionSolver(page, questionsArr[0], codeObj.answers[0])
    return  questionWillBeSolved
})

function questionSolver(page, question, answer){
    return new Promise(function(resolve, reject){
        let questionWillBeClicked = question.click()
        questionWillBeClicked.then(function(){
            let EditorInFocusPromise = page.waitForSelector('.monaco-editor.no-user-select.vs', page)
            return EditorInFocusPromise
        }).then(function(){
            let selectorLoadedPromise = page.waitForSelector('.checkbox-input')
            return selectorLoadedPromise
        }).then(function(){
            return page.click('.checkbox-input', page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput')
        }).then(function(){
            return page.click('textarea.custominput')
        }).then(function(){
            return page.type('textarea.custominput', answer, {delay: 20});
        }).then(function(){
            let CtrlIsPressed = page.keyboard.down('Control')
            return CtrlIsPressed
        }).then(function(){
            let AIsPressed = page.keyboard.press('A', {delay: 100})
            return AIsPressed
        }).then(function(){
            let XIsPressed = page.keyboard.press('x', {delay: 20})
            return XIsPressed
        }).then(function(){
            let CtrlIsUnpressed = page.keyboard.up('Control')
            return CtrlIsUnpressed
        }).then(function(){
            let MainEditorInFocusPromise = page.click('.monaco-editor.no-user-select.vs', page)
            return MainEditorInFocusPromise
        }).then(function(){
            let CtrlIsPressed = page.keyboard.down('Control')
            return CtrlIsPressed
        }).then(function(){
            let AIsPressed = page.keyboard.press('a', {delay: 100})
            return AIsPressed
        }).then(function(){
            let VIsPressed = page.keyboard.press('v', {delay: 20})
            return VIsPressed
        }).then(function(){
            return page.keyboard.up('Control')
        }).then(function(){
            return page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled')
        })
    })
}
