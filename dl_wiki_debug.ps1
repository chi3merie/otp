Set-Location 'C:\Users\hp\Desktop\pharmacystore'
$hdr = @{ 'User-Agent' = 'PharmacyStoreBot/1.0 (educational project; mailto:contact@example.com)' }

try {
  $r = Invoke-WebRequest -Uri 'https://en.wikipedia.org/wiki/Aspirin' -TimeoutSec 20 -Headers $hdr -ErrorAction Stop
  "WIKI_PAGE: OK status=$($r.StatusCode) len=$($r.Content.Length)" | Out-File 'public\images\products\_wikidebug.txt' -Encoding ascii
} catch {
  "WIKI_PAGE: ERR $($_.Exception.Message)" | Out-File 'public\images\products\_wikidebug.txt' -Encoding ascii
  if ($_.Exception.Response -and $_.Exception.Response -is [System.Net.HttpWebResponse]) {
    $code = $_.Exception.Response.StatusCode.value__
    "WIKI_PAGE_BODY_CODE: $code" | Out-File 'public\images\products\_wikidebug.txt' -Encoding ascii -Append
  }
}

try {
  $r = Invoke-WebRequest -Uri 'https://en.wikipedia.org/api/rest_v1/page/summary/Aspirin' -TimeoutSec 20 -Headers $hdr -ErrorAction Stop
  "REST: OK status=$($r.StatusCode) len=$($r.Content.Length)" | Out-File 'public\images\products\_wikidebug.txt' -Encoding ascii -Append
  $r.Content | Out-File 'public\images\products\_rest_raw.txt' -Encoding utf8
} catch [System.Net.WebException] {
  $wex = $_.Exception
  "REST: WEBERR $($wex.Message)" | Out-File 'public\images\products\_wikidebug.txt' -Encoding ascii -Append
  if ($wex.Response -and $wex.Response -is [System.Net.HttpWebResponse]) {
    $code = $wex.Response.StatusCode.value__
    $rdr = New-Object System.IO.StreamReader($wex.Response.GetResponseStream())
    $body = $rdr.ReadToEnd()
    "REST_BODY_CODE: $code len=$($body.Length)" | Out-File 'public\images\products\_wikidebug.txt' -Encoding ascii -Append
    $body | Out-File 'public\images\products\_rest_body.txt' -Encoding utf8
  }
} catch {
  "REST: ERR $($_.Exception.Message)" | Out-File 'public\images\products\_wikidebug.txt' -Encoding ascii -Append
}
"DONE" >> 'public\images\products\_wikidebug.txt'