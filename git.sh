git add .
git commit -m "new update"
git push origin master
git fetch origin master:tmp
git rebase tmp
git push origin HEAD:master
git branch -D tmp