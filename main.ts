let sprite: Sprite = null
sprite = sprites.create(img`
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbb1bbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbb11bbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbb111bbbbbbbbbbbbbb
    bbbbbbbbbbbbbbb1111bbbbbbbbbbbbb
    bbbbbbbbbbbbbbb11111bbbbbbbbbbbb
    111111111111111111111bbbbbbbbbbb
    1111111111111111111111bbbbbbbbbb
    11111111111111111111111bbbbbbbbb
    111111111111111111111111bbbbbbbb
    1111111111111111111111111bbbbbbb
    111111111111111111111111bbbbbbbb
    11111111111111111111111bbbbbbbbb
    1111111111111111111111bbbbbbbbbb
    111111111111111111111bbbbbbbbbbb
    bbbbbbbbbbbbbbb11111bbbbbbbbbbbb
    bbbbbbbbbbbbbbb1111bbbbbbbbbbbbb
    bbbbbbbbbbbbbbb111bbbbbbbbbbbbbb
    bbbbbbbbbbbbbbb11bbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbb1bbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    `, 0)
function encode(img: Image, col = 1) {
    let bits: number[] = []
    for (let x = 0; x < img.width; ++x)
        for (let y = 0; y < img.height; ++y) {
            if (img.getPixel(x, y) == col) bits.push(1)
            else bits.push(0)
        }
    let enc = [img.width, img.height, 0]
    for (let i = 0; i < bits.length;) {
        let j = i
        let b = bits[i]
        while (j < bits.length && bits[j] === bits[i])
            j++
        let num = j - i
        if (num > 63) num = 63
        if (num >= 7) {
            enc.push(0x80 | (b ? 0x40 : 0x00) | num)
            i += num
        } else {
            num = 7
            let mask = 0x01
            let e = 0x00
            while (num--) {
                if (bits[i++]) e |= mask
                mask <<= 1
            }
            enc.push(e)
        }
    }
    enc[2] = enc.length - 3
    return enc.map(n => n + "").join(", ")
}
console.log(encode(sprite.image))
