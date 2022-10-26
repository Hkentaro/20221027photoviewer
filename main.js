//クラスを用いる
class PhotoViewer{
    constructor(rootElm, images) {
        this.rootElm = rootElm;
        this.images = images;
        this.currentIndex = 0;
    }
    //初期化としてinit関数を使用する
    init(){
        //次へボタン
        const nextButtonElm = this.rootElm.querySelector('.nextButton');
        nextButtonElm.addEventListener('click', () => {
            this.next();
        });
        //前へボタン
        const prevButtonElm = this.rootElm.querySelector('.prevButton');
        prevButtonElm.addEventListener('click', () => {
            this.prev();
        });
        this.renderImageUrls();
        this.updatePhoto();
    }

    updatePhoto(){
        const frameElm = this.rootElm.querySelector('.frame');
        const imageNumber = this.currentIndex + 1;
        frameElm.innerHTML = `
            <div class="currentImage">
                <p>${imageNumber}枚目の画像です</p>
                <img src="${this.images[this.currentIndex]}" />
            </div>
        `;
        this.setTimer();
    }
    //セットタイマーを4秒設定
    setTimer(){
        if(this.intervalKey){
            clearInterval(this.intervalKey);
        }
        this.intervalKey = setInterval( () => {
            this.next();
        }, 4000);
    }

    next(){
        const lastIndex = this.images.length -1;
        if(lastIndex === this.currentIndex) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this.updatePhoto();
    }

    prev(){
        const lastIndex = this.images.length - 1;
        if(this.currentIndex === 0) {
            this.currentIndex = lastIndex;
        } else {
            this.currentIndex--;
        }
        this.updatePhoto();
    }

    renderImageUrls() {
        const imagesElm = this.rootElm.querySelector('.images');
        let imageUrlsHtml = "";
        for(const image of this.images){
            imageUrlsHtml += `<li><a href="${image}" target="_black">${image}</a></li>`; 
        }
        imagesElm.innerHTML = imageUrlsHtml;
    }
}
const images = [
    'https://fakeimg.pl/250x150/81DAF5',
    'https://fakeimg.pl/250x150/F781F3',
    'https://fakeimg.pl/250x150/81F7D8'
];
new PhotoViewer(document.getElementById('photoViewer'), images).init();
