# Script khởi động dự án WebApp
Write-Host "=== KIỂM TRA VÀ KHỞI ĐỘNG DỰ ÁN ===" -ForegroundColor Cyan

# Kiểm tra MongoDB
Write-Host "`n[1/4] Kiểm tra MongoDB..." -ForegroundColor Yellow
$mongoRunning = netstat -ano | findstr :27017
if ($mongoRunning) {
    Write-Host "✅ MongoDB đang chạy" -ForegroundColor Green
} else {
    Write-Host "⚠️  MongoDB chưa chạy hoặc chưa được cài đặt" -ForegroundColor Yellow
    Write-Host "   Backend vẫn có thể chạy nhưng sẽ không kết nối được database" -ForegroundColor Gray
}

# Kiểm tra file .env
Write-Host "`n[2/4] Kiểm tra file .env..." -ForegroundColor Yellow
$envPath = "backend\.env"
if (Test-Path $envPath) {
    Write-Host "✅ File .env đã tồn tại" -ForegroundColor Green
    Write-Host "   Nội dung:" -ForegroundColor Gray
    Get-Content $envPath | ForEach-Object { Write-Host "   $_" -ForegroundColor Gray }
} else {
    Write-Host "❌ File .env chưa tồn tại, đang tạo..." -ForegroundColor Red
    @"
MONGODB_URI=mongodb://localhost:27017/webapp
PORT=3001
"@ | Out-File -FilePath $envPath -Encoding utf8
    Write-Host "✅ Đã tạo file .env" -ForegroundColor Green
}

# Kiểm tra dependencies
Write-Host "`n[3/4] Kiểm tra dependencies..." -ForegroundColor Yellow
if (Test-Path "backend\node_modules") {
    Write-Host "✅ Backend dependencies đã được cài đặt" -ForegroundColor Green
} else {
    Write-Host "⚠️  Backend dependencies chưa được cài đặt" -ForegroundColor Yellow
    Write-Host "   Đang cài đặt..." -ForegroundColor Gray
    Set-Location backend
    npm install
    Set-Location ..
}

if (Test-Path "frontend\node_modules") {
    Write-Host "✅ Frontend dependencies đã được cài đặt" -ForegroundColor Green
} else {
    Write-Host "⚠️  Frontend dependencies chưa được cài đặt" -ForegroundColor Yellow
    Write-Host "   Đang cài đặt..." -ForegroundColor Gray
    Set-Location frontend
    npm install
    Set-Location ..
}

# Kiểm tra port đang sử dụng
Write-Host "`n[4/4] Kiểm tra port..." -ForegroundColor Yellow
$port3001 = netstat -ano | findstr :3001
$port3000 = netstat -ano | findstr :3000

if ($port3001) {
    Write-Host "⚠️  Port 3001 đang được sử dụng" -ForegroundColor Yellow
    Write-Host "   Backend có thể đã đang chạy" -ForegroundColor Gray
} else {
    Write-Host "✅ Port 3001 sẵn sàng" -ForegroundColor Green
}

if ($port3000) {
    Write-Host "⚠️  Port 3000 đang được sử dụng" -ForegroundColor Yellow
    Write-Host "   Frontend có thể đã đang chạy" -ForegroundColor Gray
} else {
    Write-Host "✅ Port 3000 sẵn sàng" -ForegroundColor Green
}

# Hướng dẫn khởi động
Write-Host "`n=== HƯỚNG DẪN KHỞI ĐỘNG ===" -ForegroundColor Cyan
Write-Host "`nĐể chạy dự án, bạn cần mở 2 terminal riêng biệt:" -ForegroundColor White
Write-Host "`nTerminal 1 - Backend:" -ForegroundColor Yellow
Write-Host "  cd backend" -ForegroundColor Gray
Write-Host "  npm start" -ForegroundColor Gray
Write-Host "`nTerminal 2 - Frontend:" -ForegroundColor Yellow
Write-Host "  cd frontend" -ForegroundColor Gray
Write-Host "  npm start" -ForegroundColor Gray
Write-Host "`nSau khi cả hai chạy thành công:" -ForegroundColor White
Write-Host "  - Backend: http://localhost:3001" -ForegroundColor Green
Write-Host "  - Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "`nLưu ý: Nếu backend báo lỗi MongoDB, bạn cần:" -ForegroundColor Yellow
Write-Host "  1. Cài đặt MongoDB Community Server" -ForegroundColor Gray
Write-Host "  2. Hoặc sử dụng MongoDB Atlas (cloud)" -ForegroundColor Gray
Write-Host "  3. Cập nhật MONGODB_URI trong file backend\.env" -ForegroundColor Gray

