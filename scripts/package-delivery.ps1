$ErrorActionPreference = 'Stop'
$projectDirectory = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$buildDirectory = Join-Path $projectDirectory 'dist/portafolio/browser'
$deliveryDirectory = Join-Path $projectDirectory 'entrega'
if (-not (Test-Path -LiteralPath (Join-Path $buildDirectory 'index.html'))) { throw 'Primero ejecuta npm run build:pages.' }
New-Item -ItemType Directory -Path $deliveryDirectory -Force | Out-Null
$dateLabel = Get-Date -Format 'yyyyMMdd-HHmmss'
$websiteArchive = Join-Path $deliveryDirectory "portafolio-web-$dateLabel.zip"
$sourceArchive = Join-Path $deliveryDirectory "portafolio-fuentes-$dateLabel.zip"
Compress-Archive -Path (Join-Path $buildDirectory '*') -DestinationPath $websiteArchive
$sourceNames = @('src', 'public', 'assets', 'scripts', 'docs', '.github', 'Agente.md', 'README.md', 'package.json', 'package-lock.json', 'angular.json', 'tsconfig.json', 'tsconfig.app.json', '.gitignore', 'index.html', 'portfolio-details.html', 'service-details.html', 'starter-page.html', 'forms')
$sourceFiles = $sourceNames | ForEach-Object { Join-Path $projectDirectory $_ } | Where-Object { Test-Path -LiteralPath $_ }
Compress-Archive -LiteralPath $sourceFiles -DestinationPath $sourceArchive
Write-Output "Sitio compilado: $websiteArchive"
Write-Output "Código fuente: $sourceArchive"
