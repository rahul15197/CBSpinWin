let prizes_config = {
    count: 12,
    prize_names: ["3000 Credits", "35% Off", "Hard Luck", "70% OFF", "Swagpack", "100% OFF", "Netflix", "50% Off", "Amazon Voucher", "2 Extra Spin", "CB Tshirt", "CB Book"]
}

let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scene: {
        preload: preload_function,
        create: create_function,
        update: update_function,
    },
    audio: {
        disableWebAudio: true
    }
}
let game = new Phaser.Game(config)

function preload_function() {
    this.load.image('background', 'Assets/back.jpg')
    this.load.image('pin', 'Assets/pin.png')
    this.load.image('stand', 'Assets/stand.png')
    this.load.image('wheel', 'Assets/wheel.png')
    this.load.image('button', 'Assets/button.png')
    this.load.image('confetti', 'Assets/confetti.png')
    this.load.audio('bg_music', 'Assets/bg_music.mp3')
}

function create_function() {
    let w = game.config.width;
    let h = game.config.height;
    let background = this.add.sprite(w / 2, h / 2, 'background')
    background.setScale(0.20)

    this.wheel = this.add.sprite(w / 2, h / 2, 'wheel')
    this.wheel.setScale(0.25)
    this.wheel.depth = 1
    let pin = this.add.sprite(w / 2, h / 2 - 250, 'pin')
    pin.setScale(0.25)
    pin.depth = 1
    let stand = this.add.sprite(w / 2, h / 2 + 250, 'stand')
    stand.setScale(0.25)
    this.button = this.add.sprite(w - 100, h - 50, 'button').setInteractive();
    this.button.setScale(0.25)
    this.button.depth = 1

    this.button.on('pointerdown', spinwheel, this);

    font_style = {
        font: "bold 30px Roboto",
        align: "center",
        color: "red",
    }
    button_font_style = {
        font: "bold 15px Roboto",
        align: "center",
        color: "black",
    }
    game_text = this.add.text(10, 10, "Welcome to Spin & Win", font_style)
    win_text = this.add.text(20, h - 60, "", {
        font: "48px Arial Black",
        fill: "#c51b7d",
        align: "center"
    })
    win_text.stroke = "#de77ae";
    win_text.strokeThickness = 16;
    win_text.setShadow(2, 2, "#333333", 2, true, true);
    win_text.depth = 2
    this.button_text = this.add.text(w - 140, h - 60, "Tap to Spin", button_font_style)
    this.button_text.depth = 2
    this.music = this.sound.add('bg_music');

}

function spinwheel() {
    let rounds = Phaser.Math.Between(2, 4)
    let degrees = Phaser.Math.Between(0, 11) * 30;
    let total_angle = rounds * 360 + degrees
    game_text.setText("Here goes the Spin")
    let idx = prizes_config.count - 1 - Math.floor(degrees / (360 / prizes_config.count));
    this.confetti = this.add.tileSprite(0, 0, 1600, 1000, 'confetti');
    this.confetti.visible = false
    if (this.tweens.getTweensOf(this.wheel).length == 0) {
        win_text.setText("")
        this.music.play()
        this.tween = this.tweens.add({
            targets: this.wheel,
            angle: total_angle,
            ease: "Cubic.easeOut",
            duration: 6000,
            callbackScope: this,
            onComplete: function () {
                this.music.stop()
                this.confetti.visible = true
                this.confetti.setOrigin(0, 0)
                this.tweens.add({
                    targets: this.confetti,
                    y: -100,
                    ease: "Elastic.easeOut",
                    duration: 1000,
                    callbackScope: this,
                    onComplete: function () {
                        this.confetti.visible = false
                    },
                })
                win_text.setText("You won " + prizes_config.prize_names[idx])
                game_text.setText("Welcome to Spin & Win")
            },
        })
    }

}

function update_function() {

}
