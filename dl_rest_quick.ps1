Set-Location 'C:\Users\hp\Desktop\pharmacystore'
$hdr = @{ 'User-Agent' = 'PharmacyStoreBot/1.0 (educational project; contact@example.com)' }
$log = @()
$sw = [System.Diagnostics.Stopwatch]::StartNew()
try {
  $enc = [System.Net.WebUtility]::UrlEncode('Aspirin')
  $api = "https://en.wikipedia.org/api/rest_v1/page/summary/$enc"
  $r = Invoke-WebRequest -Uri $api -TimeoutSec 12 -Headers $hdr -ErrorAction Stop
  $sw.Stop()
  $j = $r.Content | ConvertFrom-Json
  $log += "REST_OK elapsed_ms=$($sw.ElapsedMilliseconds) code=$($r.StatusCode) thumb=$($j.thumbnail.source) tthumb=$($j.thumbnail.width)x$($j.thumbnail.height)"
} catch {
  $sw.Stop()
  $log += "REST_ERR elapsed_ms=$($sw.ElapsedMilliseconds) $($_.Exception.Message)"
}
$log | Out-File 'public\images\products\_restquick.txt' -Encoding ascii
"DONE" >> 'public\images\products\_restquick.txt'