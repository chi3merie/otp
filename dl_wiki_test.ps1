Set-Location 'C:\Users\hp\Desktop\pharmacystore'
New-Item -ItemType Directory -Path 'public\images\products' -Force | Out-Null
$log = @()
$titles = @('Aspirin', 'Paracetamol', 'Vitamin C')
foreach ($t in $titles) {
  try {
    $api = "https://en.wikipedia.org/api/rest_v1/page/summary/$t"
    $resp = Invoke-WebRequest -Uri $api -TimeoutSec 20 -ErrorAction Stop
    $j = $resp.Content | ConvertFrom-Json
    $thumb = $j.thumbnail.source
    if (-not $thumb) { $log += "$t: NO_THUMB"; continue }
    # Request a ~480px version by replacing the width token in the thumb URL
    $imgUrl = $thumb -replace '/\d+px-', '/480px-'
    $path = "public\images\products\_w_$($t -replace '\s+','_').jpg"
    Invoke-WebRequest -Uri $imgUrl -OutFile $path -TimeoutSec 20 -ErrorAction Stop
    $f = Get-Item $path
    $b = [System.IO.File]::ReadAllBytes($path)
    $log += "$t: OK size=$($f.Length) b0=0x$('{0:x2}'-f $b[0]) b1=0x$('{0:x2}'-f $b[1]) url=$imgUrl"
  } catch {
    $log += "$t: ERR $($_.Exception.Message)"
  }
}
$log | Out-File -FilePath 'public\images\products\_wiki_test.txt' -Encoding ascii
"DONE" >> 'public\images\products\_wiki_test.txt'