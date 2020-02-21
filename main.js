/** 일렉트론 모듈 **/
const { app, BrowserWindow } = require('electron')



/** 로깅 모듈 **/
const logger = require('./resources/js/log/winston');



/** DB 모듈 **/
const DBUtils = require('./resources/js/DBUtils');



/** 메인 HTML 페이지 **/
const mainHtmlPage = 'main.html';



/** 스플래쉬 HTML 페이지 **/
const splashScreenPage = './resources/html/splashscreen.html';


  
/**
 * window 객체는 전역 변수로 유지. 이렇게 하지 않으면, 
 * 자바스크립트 객체가 가비지 콜렉트될 때 자동으로 창이 닫힐 것입니다.
 */
let win



/**
 * splash 객체
 */
let splashWindow



/**
 * 이 메서드는 Electron이 초기화를 마치고 
 * 브라우저 창을 생성할 준비가 되었을 때  호출될 것입니다.
 * 어떤 API는 이 이벤트가 나타난 이후에만 사용할 수 있습니다.
 */
app.on('ready', function(){
	
	// create main window 
	createWindow();
	
	// create splash window
	createSplashWindow();
	
});




/**
 *모든 창이 닫혔을 때 호출되는 콜백 함수
 */
app.on('window-all-closed', () => {
	
  // macOS에서는 사용자가 명확하게 Cmd + Q를 누르기 전까지는
  // 애플리케이션이나 메뉴 바가 활성화된 상태로 머물러 있는 것이 일반적입니다.
  if (process.platform !== 'darwin') {
    
	app.quit();
  
  }
    
});



/**
 * macOS에서는 dock 아이콘이 클릭되고 다른 윈도우가 열려있지 않았다면
 * 앱에서 새로운 창을 다시 여는 것이 일반적입니다.
 */
app.on('activate', () => {
  
  if (win === null) {
	// create main window 
	createWindow();
	
	// create splash window
	createSplashWindow();

  }
  
});



/**
 * 스플래쉬 화면 BrowserWindow 객체를 생성한다.
 */
function createSplashWindow() {
	
	// 스플래쉬 화면 BrowserWindow 객체를 생성
	splashWindow = new BrowserWindow({
		
		width: 600, 
		height: 400, 
		transparent: true, 
		frame: false, 
		alwaysOnTop: true,
		center: true	
		
	});
	
	// 스플래쉬화면 객체 설정
	splashWindow.setMenuBarVisibility(false);
	
	// 스플래쉬화면 HTML 링크 및 로드
	splashWindow.loadFile(splashScreenPage);
	
	// 스플래쉬화면이 'destroy()'되었을 때 호출되는 콜백함수
	splashWindow.on('closed', function(){
		
		splashWindow = null;			
		
	});

}

/**
 * 메인 화면 BrowserWindow 객체를 생성한다.
 */
function createWindow () {
	
  // 메인 화면 BrowserWindow 객체를 생성
  win = new BrowserWindow({
    
	width: 1600,
    height: 900,
	x: -2550, 					// 임시로 설정
	y: 230, 					// 임시로 설정
	center: true,	
	titleBarStyle: 'hidden',
	show: false,				// 메인 화면 BrowserWindow 객체 생성할 때 보여주지 않는다. 'ready-to-show' 이벤트가 발생했을 때 show() 로 보여준다.
	
    webPreferences: {
		
      nodeIntegration: true
	  
    }
	
  });
  
  // 메인 화면 BrowserWindow 메뉴바 삭제
  win.setMenuBarVisibility(false);
  
  // 개발자 도구를 엽니다.
  win.webContents.openDevTools()

  // main.html 파일 로드
  win.loadFile(mainHtmlPage);
  
  // DB 생성 혹은 로드
  DBUtils.addEmptyIrProjectInfo();
  
  // 메인 화면 BrowserWindow 객체가 생성되서 보여주기 직전에 호출되는 콜백 함수
  win.once('ready-to-show', () => {
	  
	  // 임의로 3초 주고 시작
	  setTimeout(function(){
		  
		splashWindow.destroy(); // 스플래쉬 화면 BrowserWindow를 force closing.
		win.show();				// 메인 화면 BrowserWindow를 보여준다.		  
		
	  }, 3000);
	  
  });
  
  // 메인 화면 BrowserWindow 창이 닫힐 때 호출되는 콜백 함수
  win.on('closed', () => {
	  
    // window 객체에 대한 참조해제. 여러 개의 창을 지원하는 앱이라면 
    // 창을 배열에 저장할 수 있습니다. 이곳은 관련 요소를 삭제하기에 좋은 장소입니다.
    win = null;
	
  });
}



// 이 파일 안에 당신 앱 특유의 메인 프로세스 코드를 추가할 수 있습니다. 별도의 파일에 추가할 수도 있으며 이 경우 require 구문이 필요합니다.