export function Bw (image) {
  let data = image.data
  for (let i = 0; i < data.length / 4; i++) {
    var avg = (data[i * 4] + data[i * 4 + 1] + data[i * 4 + 2]) / 3
    data[i * 4] = avg // red
    data[i * 4 + 1] = avg // green
    data[i * 4 + 2] = avg // blue
  }
  return image
}
export const gw = ({ srcc, cc, c, m }) => {
  var img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = srcc
  img.onload = function () {
    var pattern = cc.createPattern(img, 'repeat')
    cc.fillStyle = pattern
    cc.fillRect(0, 0, 1920, 1080)
    let id = c.getImageData(0, 0, 1920, 1080)
    let ccd = cc.getImageData(0, 0, 1920, 1080)
    let data = id.data

    for (let i = 0; i < data.length / 4; i++) {
      let r = data[i * 4 + 0]
      let g = data[i * 4 + 1]
      let b = data[i * 4 + 2]
      if (g >= m.g && r >= m.r && b >= m.b) {
        data[i * 4 + 3] = 255
        data[i * 4 + 0] = ccd.data[i * 4 + 0]
        data[i * 4 + 1] = ccd.data[i * 4 + 1]
        data[i * 4 + 2] = ccd.data[i * 4 + 2]
      }
    }
    cc.putImageData(id, 0, 0)
  }
}
export const gx = ({ srcc, cc, c, m }) => {
  var img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = srcc
  img.onload = function () {
    var pattern = cc.createPattern(img, 'repeat')
    cc.fillStyle = pattern
    cc.fillRect(0, 0, 1920, 1080)
    let id = c.getImageData(0, 0, 1920, 1080)
    let ccd = cc.getImageData(0, 0, 1920, 1080)
    let data = id.data
    for (let i = 0; i < data.length / 4; i++) {
      let r = data[i * 4 + 0]
      let g = data[i * 4 + 1]
      let b = data[i * 4 + 2]
      if (g <= m.g && r <= m.r && b <= m.b) {
        data[i * 4 + 3] = 255
        data[i * 4 + 0] = ccd.data[i * 4 + 0]
        data[i * 4 + 1] = ccd.data[i * 4 + 1]
        data[i * 4 + 2] = ccd.data[i * 4 + 2]
      }
    }
    cc.putImageData(id, 0, 0)
  }
}
