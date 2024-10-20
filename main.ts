namespace SpriteKind {
    export const Obsticle = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Girl.vy == 0) {
        music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
        animation.runMovementAnimation(
        Girl,
        animation.animationPresets(animation.easeUp),
        1000,
        false
        )
        pause(1000)
        animation.runMovementAnimation(
        Girl,
        animation.animationPresets(animation.easeDown),
        1000,
        false
        )
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
    Fireball = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . 4 5 5 4 . . . . . . 
        . . . . . . 2 5 5 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    Fireball.setPosition(LastX, LastY)
    animation.runMovementAnimation(
    Fireball,
    animation.animationPresets(animation.easeUp),
    750,
    false
    )
    pause(750)
    sprites.destroy(Fireball)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Obsticle, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.UntilDone)
    sprites.destroy(Girl, effects.hearts, 2000)
    pause(1000)
    game.gameOver(false)
    game.reset()
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    Bird = sprites.create(assets.image`Bird`, SpriteKind.Enemy)
    Bird.setVelocity(Velocity, 0)
    Bird.setStayInScreen(true)
    Bird.setBounceOnWall(true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    sprites.destroy(Bird, effects.fire, 2000)
    info.changeScoreBy(1)
    if (info.score() > 5) {
        game.gameOver(true)
    }
    Velocity += 10
    pause(1000)
    game.splash("\"Quack!\"", "\"Press A\"")
    Tree = sprites.create(img`
        .....6eeeeeeeeeece6.....
        ....6776eeeeeeeee676....
        ...6776666eeee6766776...
        ..6776ee77777777667776..
        ...668ce7768867788666...
        ......ce77eeee67ee......
        ......eeeeeeeeeeee......
        ......eeeeeeeeeeee......
        ......eeeeeeeeeeee......
        ......eeeeeeeeeeee......
        ......eeeeeeeeeeee......
        ......eeeeeeeeeeee......
        ......eeeeeeeeeeee......
        ......beeeeeeeeeeb......
        .......beeeeeeeeb.......
        ........beeeeeeb........
        `, SpriteKind.Obsticle)
    Tree.y = 110
    Tree.x = randint(0, 240)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    sprites.destroy(Bird, effects.fire, 2000)
    info.changeScoreBy(1)
    Velocity += 10
    pause(1000)
    game.splash("\"Quack!\"", "\"Press A\"")
})
let Tree: Sprite = null
let LastY = 0
let LastX = 0
let Fireball: Sprite = null
let Velocity = 0
let Bird: Sprite = null
let Girl: Sprite = null
scene.setBackgroundImage(assets.image`Background 1`)
Girl = sprites.create(assets.image`Girl Front`, SpriteKind.Player)
Girl.setPosition(0, 110)
controller.moveSprite(Girl, 100, 0)
Girl.setStayInScreen(true)
Girl.setBounceOnWall(false)
tiles.setCurrentTilemap(tilemap`Tilemap Level 1`)
Bird = sprites.create(assets.image`Bird`, SpriteKind.Enemy)
Velocity = 50
Bird.setVelocity(Velocity, 0)
Bird.setBounceOnWall(true)
Bird.setStayInScreen(true)
game.onUpdate(function () {
    LastX = Girl.x
    LastY = Girl.y
})
