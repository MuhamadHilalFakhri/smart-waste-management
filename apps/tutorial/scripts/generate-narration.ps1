$ErrorActionPreference = "Stop"
$source = Join-Path $PSScriptRoot "narration.json"
$audioDirectory = Join-Path $PSScriptRoot "..\public\audio"
New-Item -ItemType Directory -Force -Path $audioDirectory | Out-Null
$entries = Get-Content -Raw $source | ConvertFrom-Json
Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SelectVoice("Microsoft Andika")
$synth.Rate = 2
$synth.Volume = 100

try {
    foreach ($entry in $entries.PSObject.Properties) {
        $output = Join-Path $audioDirectory ($entry.Name + ".wav")
        $synth.SetOutputToWaveFile($output)
        $synth.Speak([string]$entry.Value)
        $synth.SetOutputToNull()
        Write-Output ("Dibuat: " + $entry.Name)
    }
}
finally {
    $synth.Dispose()
}
