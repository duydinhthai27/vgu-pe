# Backup db

- First start the project with `docker-compose up`, open a new terminal in project's directory and run

```bash
docker run --rm --volumes-from vgupe2024_team1-mysqldb-1 -v ./backup_db:/backup ubuntu tar cvf /backup/db_backup.tar /var/lib/mysql
```

# Restore db

- First start the project with `docker-compose up`, open a new terminal in project's directory and run

```bash
docker run --rm --volumes-from vgupe2024_team1-mysqldb-1 -v ./backup_db:/backup ubuntu bash -c "cd /var/lib/mysql && tar xvf /backup/db_backup.tar --strip 1"
```


