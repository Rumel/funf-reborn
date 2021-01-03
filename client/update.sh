yarn build
cd build && aws s3 sync ./ s3://funf-client