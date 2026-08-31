Set-Location 'C:\Users\hp\Desktop\pharmacystore'
$tests = @(
  @{ name='picsum_id10'; url='https://picsum.photos/id/10/400/400' },
  @{ name='picsum_id20'; url='https://picsum.photos/id/20/400/400' },
  @{ name='picsum_id1084'; url='https://picsum.photos/id/1084/400/400' },
  @{ name='unsplash_direct'; url='https://images.unsplash.com/photo-1559523346-843895126389?auto=format&fit=crop&w=400' },
  @{ name='unsplash_pills'; url='https://images.unsplash.com/photo-1581092796325-f8d69242b1d5?auto=format&fit=crop&w=400' },
  @{ name='pexels'; url='https://images.pexels.com/photos/13932801/pexels-photo-13932801.jpeg?auto=compress&cs=tinysrgb&w=400' }
)
$log = @()
foreach ($t in $tests) {
  $path = "public\images\products\_t_$($t.name).jpg"
  try {
    Invoke-WebRequest -Uri $t.url -OutFile $path -TimeoutSec 20 -ErrorAction Stop
    $f = Get-Item $path
    if ($f.Length -gt 0) {
      $b = [System.IO.File]::ReadAllBytes($path)
      $log += "$($t.name): OK size=$($f.Length) b0=0x$('{0:x2}'-f $b[0]) b1=0x$('{0:x2}'-f $b[1])"
    } else {
      $log += "$($t.name): EMPTY"
    }
  } catch {
    $msg = $_.Exception.Message
    $log += "$($t.name): ERR $msg"
  }
}
$log | Out-File -FilePath 'public\images\products\_hosttest.txt' -Encoding ascii
"DONE" >> 'public\images\products\_hosttest.txt'