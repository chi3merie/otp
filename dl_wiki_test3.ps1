Set-Location 'C:\Users\hp\Desktop\pharmacystore'
$hdr = @{ 'User-Agent' = 'PharmacyStoreBot/1.0 (educational project; contact@example.com)' }
$log = @()
$titles = @('Aspirin', 'Paracetamol', 'Vitamin C')
foreach ($t in $titles) {
  try {
    $enc = [System.Net.WebUtility]::UrlEncode($t)
    $api = "https://en.wikipedia.org/api/rest_v1/page/summary/$enc"
    $resp = Invoke-WebRequest -Uri $api -TimeoutSec 25 -Headers $hdr -ErrorAction Stop
    $j = $resp.Content | ConvertFrom-Json
    $thumb = $j.thumbnail.source
    if (-not $thumb) { $log += "$($t): NO_THUMB (title: $($j.title))"; continue }
    $imgUrl = $thumb -replace '/\d+px-', '/480px-'
    $safe = $t -replace '\s+', '_'
    $path = "public\images\products\_w_$safe.jpg"
    Invoke-WebRequest -Uri $imgUrl -OutFile $path -TimeoutSec 25 -Headers $hdr -ErrorAction Stop
    $f = Get-Item $path
    $b = [System.IO.File]::ReadAllBytes($path)
    $log += "$($t): OK size=$($f.Length) b0=0x$('{0:x2}'-f $b[0]) b1=0x$('{0:x2}'-f $b[1]) w=$($j.thumbnail.width) h=$($j.thumbnail.height) url=$imgUrl"
  } catch {
    $log += "$($t): ERR $($_.Exception.Message)"
  }
}
$log | Out-File -FilePath 'public\images\products\_wiki_test.txt' -Encoding ascii
"DONE" >> 'public\images\products\_wiki_test.txt'