#!/bin/sh

echo "docsをクリア"
rm -rf docs
mkdir docs

echo "プロジェクトのbuild"
npm run production

echo "publicディレクトリのコピー"
cp -a public docs/public
