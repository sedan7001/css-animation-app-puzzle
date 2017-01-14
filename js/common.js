/**
 * Created by sedan on 2017-01-09.
 */


$(document).ready(function () {
    $(".continue").click(function(){
       location.href = "index.html";
    });
    //$("#reset").click(function(){
    //    location.href = "index.html";
    //});
    //
    //
    //
    //function Timer() {
    //    var offset;
    //    this.watchTime = 0;
    //    this.isOn = false;
    //    this.isReset = false;
    //    this.element = document.getElementById('time');
    //}
    //Timer.prototype = {
    //    start: function() {
    //        if (!this.isOn) {
    //            offset = Date.now();
    //            interval = setInterval(this.update.bind(this), 20);
    //            this.isOn = true;
    //            this.isReset = false;
    //        }
    //    },
    //    check: function() {
    //
    //        console.log(this.delta);
    //    },
    //    update: function(elem) {
    //        var appliedElement = this.element || elem;
    //        this.watchTime = this.watchTime + this.delta();
    //        (this.isReset) ? this.chWatch(0): false;
    //        appliedElement.textContent = this.formatTime(this.watchTime);
    //
    //        //console.log(this.watchTime);
    //    },
    //    delta: function() {
    //        var timeNow = Date.now();
    //        var timepassed = timeNow - offset;
    //        offset = timeNow;
    //        //console.log(timepassed);
    //        return timepassed;
    //    },
    //
    //    chWatch: function(num) {
    //
    //        this.watchTime = num;
    //        return this.watchTime
    //    },
    //    formatTime: function(mtime) {
    //        var formatedTime = new Date(mtime);
    //        var minute = formatedTime.getMinutes().toString();
    //        var seconds = formatedTime.getSeconds().toString();
    //        var milliSeconds = formatedTime.getMilliseconds().toString();
    //
    //        if (minute.length < 2) {
    //            minute = '0' + minute;
    //        }
    //
    //        if (seconds.length < 2) {
    //            seconds = '0' + seconds;
    //        }
    //        /*if(milliSeconds <3) {
    //         milliSeconds = '0'+ milliSeconds;
    //         }*/
    //        while (milliSeconds.length < 3) {
    //
    //            milliSeconds = '0' + milliSeconds;
    //        }
    //
    //        //return minute + ':' + seconds + ':' + milliSeconds;
    //        return minute + ':' + seconds;
    //    },
    //    pause: function() {
    //        if (this.isOn) {
    //            clearInterval(interval);
    //            this.isOn = false;
    //            this.isReset = false;
    //        }
    //    },
    //    reset: function() {
    //        this.isReset = true;
    //        this.chWatch(0);
    //        this.update(this.element);
    //
    //    }
    //}
    //var sWatch = new Timer();
    //
    //start.addEventListener('click', function() {
    //    if (!sWatch.isOn) {
    //        sWatch.start();
    //        this.textContent = 'pause'
    //        time.style.color = "#555";
    //    } else {
    //        sWatch.pause();
    //        this.textContent = 'resume ';
    //        time.style.color = '#999';
    //    }
    //});
    //reset.addEventListener('click', function() {
    //    (!sWatch.isOn) ? sWatch.reset(): false;
    //
    //})
    //
    //
    //$("#start").trigger("click");


    var num = 0;
    var Memory = {

        init: function (cards) {
            this.$game = $(".game");
            this.$modal = $(".modal");
            this.$overlay = $(".modal-overlay");
            this.$restartButton = $("button.hardmode");
            //if(num==1){
            //    alert('2단계다');
            //}
            this.cardsArray = $.merge(cards, cards);
            //alert(this.cardsArray.length);
            //alert(cards);
            this.shuffleCards(this.cardsArray);
            this.setup();


        },

        shuffleCards: function (cardsArray) {
            this.$cards = $(this.shuffle(this.cardsArray));
        },

        setup: function () {
            this.html = this.buildHTML();
            this.$game.html(this.html);
            this.$memoryCards = $(".card");
            this.binding();
            this.paused = false;
            this.guess = null;

        },

        binding: function () {
            this.$memoryCards.on("click", this.cardClicked);
            this.$restartButton.on("click", $.proxy(this.reset, this));
        },

        cardClicked: function () {
            var _ = Memory;
            var $card = $(this);
            if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
                $card.find(".inside").addClass("picked");
                if (!_.guess) {
                    _.guess = $(this).attr("data-id");
                } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                    $(".picked").addClass("matched");
                    _.guess = null;
                } else {
                    _.guess = null;
                    _.paused = true;
                    setTimeout(function () {
                        $(".picked").removeClass("picked");
                        Memory.paused = false;
                    }, 600);
                }
                if ($(".matched").length == $(".card").length) {
                    _.win();
                }
            }
        },

        win: function () {
            this.paused = true;
            setTimeout(function () {
                Memory.showModal();
                Memory.$game.fadeOut();
            }, 1000);
            num++;
            //alert(num);
        },

        showModal: function () {
            this.$overlay.show();
            this.$modal.fadeIn("slow");
        },

        hideModal: function () {
            this.$overlay.hide();
            this.$modal.hide();
        },

        reset: function () {
            this.hideModal();

            //this.shuffleCards(this.cardsArray);


            this.$cards = $(this.shuffle($.merge(cards2, cards2)));
            this.setup();
            $(".card").css("width","16.66%");
            $(".card").css("height","16.66%");
            $(".back").css("padding","0.25em");
            this.$game.show("slow");

        },


        shuffle: function (array) {
            var counter = array.length, temp, index;

            while (counter > 0) {

                index = Math.floor(Math.random() * counter);

                counter--;

                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        },

        buildHTML: function () {
            var frag = '';

            this.$cards.each(function (k, v) {
                frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="' + v.img + '"\
				alt="' + v.name + '" /></div>\
				<div class="back"><img src="img/puzzle4.png"\
				alt="img" /></div></div>\
				</div>';
            });
            return frag;

        }
    };



    var cards = [
        {
            name: "rss",
            img: "img/rss.png",
            id: 1,
        },
        {
            name: "facebook",
            img: "img/facebook.png",
            id: 2
        },
        {
            name: "google-plus",
            img: "img/google-plus.png",
            id: 3
        },
        {
            name: "line",
            img: "img/line.png",
            id: 4
        },
        {
            name: "linkedin",
            img: "img/linkedin.png",
            id: 5
        },
        {
            name: "pinterest",
            img: "img/pinterest.png",
            id: 6
        },
        {
            name: "telegram",
            img: "img/telegram.png",
            id: 7
        },
        {
            name: "tumblr",
            img: "img/tumblr.png",
            id: 8
        }

    ];

    var cards2=[
        {
            name: "airplane",
            img: "img/airplane.png",
            id: 9
        },
        {
            name: "envelope",
            img: "img/envelope.png",
            id: 10
        },
        {
            name: "lighthouse",
            img: "img/lighthouse.png",
            id: 11
        },
        {
            name: "mailbox",
            img: "img/mailbox.png",
            id: 12
        },
        {
            name: "megaphone",
            img: "img/megaphone.png",
            id: 13
        },
        {
            name: "newspaper",
            img: "img/newspaper.png",
            id: 14
        },
        {
            name: "radio-antenna",
            img: "img/radio-antenna.png",
            id: 15
        },
        {
            name: "sailboat",
            img: "img/sailboat.png",
            id: 16
        },
        {
            name: "satellite",
            img: "img/satellite.png",
            id: 17
        },
        {
            name: "satellite-dish",
            img: "img/satellite-dish.png",
            id: 18
        },
        {
            name: "settings",
            img: "img/settings.png",
            id: 19
        },
        {
            name: "smartphone",
            img: "img/smartphone.png",
            id: 20
        },
        {
            name: "telephone",
            img: "img/telephone.png",
            id: 21
        },
        {
            name: "telephone-1",
            img: "img/telephone-1.png",
            id: 22
        },
        {
            name: "television",
            img: "img/television.png",
            id: 23
        },
        {
            name: "usb-cable",
            img: "img/usb-cable.png",
            id: 24
        },
        {
            name: "radio",
            img: "img/radio.png",
            id: 25
        },
        {
            name: "webcam",
            img: "img/webcam.png",
            id: 26
        }
    ];

    Memory.init(cards);




});