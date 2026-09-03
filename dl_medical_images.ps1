Set-Location 'C:\Users\hp\Desktop\pharmacystore'
Add-Type -AssemblyName System.Drawing

$outDir = 'public\images\products'
New-Item -ItemType Directory -Path $outDir -Force | Out-Null

function New-RoundedPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $p.AddArc($x, $y, 2 * $r, 2 * $r, 180, 90)
  $p.AddArc($x + $w - 2 * $r, $y, 2 * $r, 2 * $r, 270, 90)
  $p.AddArc($x + $w - 2 * $r, $y + $h - 2 * $r, 2 * $r, 2 * $r, 0, 90)
  $p.AddArc($x, $y + $h - 2 * $r, 2 * $r, 2 * $r, 90, 90)
  $p.CloseFigure()
  return $p
}

function ConvertFrom-Hex([string]$hex) {
  return [System.Drawing.ColorTranslator]::FromHtml($hex)
}

function Draw-Bottle($g, [float]$x, [float]$y, [float]$w, [float]$h, [string]$capHex, [string]$labelTop, [string]$labelSub) {
  $capH = [Math]::Max(28.0, $h * 0.16)
  $bodyY = $y + $capH
  $bodyH = $h - $capH

  $bodyPath = New-RoundedPath $x $bodyY $w $bodyH 22
  $bodyBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
  $bodyPen = New-Object System.Drawing.Pen (ConvertFrom-Hex '#c9d2da'), 3
  $g.FillPath($bodyBrush, $bodyPath)
  $g.DrawPath($bodyPen, $bodyPath)

  $capPath = New-RoundedPath ($x - 6) $y ($w + 12) ($capH + 8) 8
  $capBrush = New-Object System.Drawing.SolidBrush (ConvertFrom-Hex $capHex)
  $g.FillPath($capBrush, $capPath)

  $labX = $x + 10
  $labY = $bodyY + $bodyH * 0.14
  $labW = $w - 20
  $labH = $bodyH * 0.62
  $labPath = New-RoundedPath $labX $labY $labW $labH 10
  $labPen = New-Object System.Drawing.Pen (ConvertFrom-Hex '#d8dee5'), 2
  $g.DrawPath($labPen, $labPath)

  $barBrush = New-Object System.Drawing.SolidBrush (ConvertFrom-Hex $capHex)
  $g.FillRectangle($barBrush, $labX, $labY, $labW, 10)

  $nameFont = New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Bold)
  $subFont = New-Object System.Drawing.Font('Segoe UI', 12, [System.Drawing.FontStyle]::Regular)
  $textBrush = New-Object System.Drawing.SolidBrush (ConvertFrom-Hex '#25313a')
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = [System.Drawing.StringAlignment]::Center
  $fmt.LineAlignment = [System.Drawing.StringAlignment]::Center
  $nameRect = [System.Drawing.RectangleF]::new([float]$labX, [float]($labY + 16), [float]$labW, [float]($labH * 0.45))
  $subRect = [System.Drawing.RectangleF]::new([float]$labX, [float]($labY + $labH * 0.52), [float]$labW, [float]($labH * 0.3))
  $g.DrawString($labelTop, $nameFont, $textBrush, $nameRect, $fmt)
  $g.DrawString($labelSub, $subFont, $textBrush, $subRect, $fmt)

  $bodyPath.Dispose(); $capPath.Dispose(); $labPath.Dispose()
  $bodyBrush.Dispose(); $bodyPen.Dispose(); $capBrush.Dispose()
  $labPen.Dispose(); $barBrush.Dispose(); $nameFont.Dispose()
  $subFont.Dispose(); $textBrush.Dispose(); $fmt.Dispose()
}

function Draw-Blister($g, [float]$x, [float]$y, [float]$w, [float]$h, [string]$pillHex, [string]$labelTop, [string]$labelSub) {
  $packPath = New-RoundedPath $x $y $w $h 16
  $packBrush = New-Object System.Drawing.SolidBrush (ConvertFrom-Hex '#eef1f6')
  $packPen = New-Object System.Drawing.Pen (ConvertFrom-Hex '#b9c2cc'), 3
  $g.FillPath($packBrush, $packPath)
  $g.DrawPath($packPen, $packPath)

  $pillBrush = New-Object System.Drawing.SolidBrush (ConvertFrom-Hex $pillHex)
  $wellPen = New-Object System.Drawing.Pen (ConvertFrom-Hex '#c3ccd6'), 2
  $cols = 4; $rows = 3
  $cw = $w / $cols; $ch = ($h - 70) / $rows
  for ($r = 0; $r -lt $rows; $r++) {
    for ($c = 0; $c -lt $cols; $c++) {
      $cx = $x + $c * $cw + $cw / 2
      $cy = $y + 60 + $r * $ch + $ch / 2
      $rad = [Math]::Min($cw, $ch) * 0.32
      $g.FillEllipse($pillBrush, $cx - $rad, $cy - $rad, 2 * $rad, 2 * $rad)
      $g.DrawEllipse($wellPen, $cx - $rad, $cy - $rad, 2 * $rad, 2 * $rad)
    }
  }

  $nameFont = New-Object System.Drawing.Font('Segoe UI', 18, [System.Drawing.FontStyle]::Bold)
  $subFont = New-Object System.Drawing.Font('Segoe UI', 12, [System.Drawing.FontStyle]::Regular)
  $textBrush = New-Object System.Drawing.SolidBrush (ConvertFrom-Hex '#25313a')
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = [System.Drawing.StringAlignment]::Center
  $nameRect = [System.Drawing.RectangleF]::new([float]$x, [float]($y + 12), [float]$w, [float]34)
  $subRect = [System.Drawing.RectangleF]::new([float]$x, [float]($y + $h - 34), [float]$w, [float]28)
  $g.DrawString($labelTop, $nameFont, $textBrush, $nameRect, $fmt)
  $g.DrawString($labelSub, $subFont, $textBrush, $subRect, $fmt)

  $packPath.Dispose(); $packBrush.Dispose(); $packPen.Dispose()
  $pillBrush.Dispose(); $wellPen.Dispose(); $nameFont.Dispose()
  $subFont.Dispose(); $textBrush.Dispose(); $fmt.Dispose()
}

function Draw-Box($g, [float]$x, [float]$y, [float]$w, [float]$h, [string]$accentHex, [string]$labelTop, [string]$labelSub) {
  $boxPath = New-RoundedPath $x $y $w $h 14
  $boxBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
  $boxPen = New-Object System.Drawing.Pen (ConvertFrom-Hex '#c9d2da'), 3
  $g.FillPath($boxBrush, $boxPath)
  $g.DrawPath($boxPen, $boxPath)

  $bandH = $h * 0.22
  $bandPath = New-RoundedPath $x $y $w $bandH 14
  $bandBrush = New-Object System.Drawing.SolidBrush (ConvertFrom-Hex $accentHex)
  $g.FillPath($bandBrush, $bandPath)

  $crossBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
  $cx = $x + $w * 0.5; $cy = $y + $bandH * 0.5; $arm = $bandH * 0.3; $th = $bandH * 0.12
  $g.FillRectangle($crossBrush, $cx - $th / 2, $cy - $arm, $th, 2 * $arm)
  $g.FillRectangle($crossBrush, $cx - $arm, $cy - $th / 2, 2 * $arm, $th)

  $nameFont = New-Object System.Drawing.Font('Segoe UI', 20, [System.Drawing.FontStyle]::Bold)
  $subFont = New-Object System.Drawing.Font('Segoe UI', 12, [System.Drawing.FontStyle]::Regular)
  $textBrush = New-Object System.Drawing.SolidBrush (ConvertFrom-Hex '#25313a')
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = [System.Drawing.StringAlignment]::Center
  $nameRect = [System.Drawing.RectangleF]::new([float]$x, [float]($y + $bandH + 24), [float]$w, [float]40)
  $subRect = [System.Drawing.RectangleF]::new([float]$x, [float]($y + $bandH + 70), [float]$w, [float]30)
  $g.DrawString($labelTop, $nameFont, $textBrush, $nameRect, $fmt)
  $g.DrawString($labelSub, $subFont, $textBrush, $subRect, $fmt)

  $boxPath.Dispose(); $bandPath.Dispose(); $boxBrush.Dispose(); $boxPen.Dispose()
  $bandBrush.Dispose(); $crossBrush.Dispose(); $nameFont.Dispose()
  $subFont.Dispose(); $textBrush.Dispose(); $fmt.Dispose()
}

function New-ProductImage([string]$file, [string]$bgHex, [string]$style, [string]$accent, [string]$top, [string]$sub) {
  $W = 800; $H = 600
  $bmp = New-Object System.Drawing.Bitmap $W, $H
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

  $rect = New-Object System.Drawing.Rectangle 0, 0, $W, $H
  $c1 = ConvertFrom-Hex $bgHex
  $c2 = [System.Drawing.Color]::White
  $grad = [System.Drawing.Drawing2D.LinearGradientBrush]::new($rect, $c1, $c2, [float]90)
  $g.FillRectangle($grad, $rect)

  $shadowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(40, 60, 80, 95))
  $g.FillEllipse($shadowBrush, 250, 480, 300, 36)

  switch ($style) {
    'bottle'  { Draw-Bottle  $g 300 140 200 340 $accent $top $sub }
    'blister' { Draw-Blister $g 170 150 460 300 $accent $top $sub }
    'box'     { Draw-Box     $g 250 140 300 320 $accent $top $sub }
  }

  $path = Join-Path $outDir $file
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $g.Dispose(); $bmp.Dispose()
  Write-Output "saved $file"
}

New-ProductImage 'med_paracetamol.jpg' '#fdeeee' 'bottle'  '#d64545' 'Paracetamol'   '500 mg - 100 tablets'
New-ProductImage 'med_ibuprofen.jpg'   '#fdf3e9' 'bottle'  '#e8862d' 'Ibuprofen'     '200 mg - 100 capsules'
New-ProductImage 'med_aspirin.jpg'     '#eef3fd' 'blister' '#c23b3b' 'Aspirin 81 mg' 'Enteric coated - 90 tablets'
New-ProductImage 'med_cetirizine.jpg'  '#eafaf7' 'box'     '#2d9d8f' 'Cetirizine'    '10 mg - 30 tablets'
New-ProductImage 'med_amoxicillin.jpg' '#effaf1' 'bottle'  '#3d9950' 'Amoxicillin'   '500 mg - 30 capsules'
New-ProductImage 'med_metformin.jpg'   '#eef2fd' 'bottle'  '#2d6bd6' 'Metformin'     '500 mg - 60 tablets'
New-ProductImage 'med_omeprazole.jpg'  '#f4f0fd' 'bottle'  '#7a4fd6' 'Omeprazole'    '20 mg - 28 capsules'
New-ProductImage 'med_vitaminc.jpg'    '#fdf6e9' 'bottle'  '#f2a33c' 'Vitamin C'     '1000 mg - 60 tablets'
Write-Output 'ALL_DONE'