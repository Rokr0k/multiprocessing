# multiprocessing
A rhythm game made with HTML5 and JavaScript.
[Go to](https://rokr0k.tk/multiprocessing)

## Fish Part
> - A fish is swimming through rings.
> - You have to press F when the fish goes through the rings.

## Ball Part
> - Some balls are falling onto the ground.
> - You have to press J when the ball hits the ground.

## Shoot Part
> - A target is approaching to your aim.
> - You have to press D when the target is perfectly aimmed.

## Draw Part
> - I made it but I actually don"t know what it is.
> - You have to press K when notes are passing the long line. (Long note available)

# Level Editing
> I made a template .html file so that everyone can create their own levels in the same way as I do.
[template.html](./template.html)

## How to
### To set Audio File
```js
let audioFile = "audio.ogg";
```
> Plays "audio.ogg" as the game starts.

### To set BPM,
```js
{type:"b", bpm:120, offset:1}
```
> BPM: 120, Offset: 1s

If you want to change it again,
```js
{type:"b", bpm:120, offset:1}, ..., {type:"b", bpm:180, offset:1}
```
> BPM: 180, Offset: 1.5s (from the beginning of the audio)

The offset works along the bpm. The default bpm is 60, so you can set it in seconds in the initial setting.

### To add a note,
```js
{type:"n", kind:0, pos:10}, {type:"n", kind:1, pos:11}, {type:"n", kind:2, pos:12}, {type:"n", kind:3, pos:13}, {type:"n", kind:3, pos:14, dur:2}
```
> Fish note on 10th beat, Ball note on 11th beat, Shoot note on 12th beat, Draw notes on 13th and 14th~16th beat.

As a result,
```js
let crochet = [
    {type:"b", 120, 1},
    {type:"n", kind:0, pos:10},
    {type:"n", kind:1, pos:11},
    {type:"n", kind:2, pos:12},
    {type:"n", kind:3, pos:13},
    {type:"n", kind:3, pos:14, dur:2}
];
```

## Gimmick Patterns
Users that are familiar with javascript may make some gimmick patterns in their levels.
```js
function gimmick() { // Code before the graphics are completely drawn.
    // pass;
}
function lategimmick() { // Code after the graphics are completely drawn.
    // pass;
}
```
> You can draw above or below the original graphics, or even make totally another game.

For performance, notes that would probably not seen based on original graphics are not rendered. If you want to render them, modify following variable.
```js
drawRange[0].min = 0;
drawRange[0].max = nList[0].length;
```
> It would make every notes in Fish part rendered, may occur lags.

You can refer to the gameplay.js file as you make gimmick patterns, but you may not modify it for compability.
