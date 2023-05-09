from .db import db
import os


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ruta = db.Column(db.String(300), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("infoUser.id"))
    provider_id = db.Column(db.Integer, db.ForeignKey("infoProvider.id"))

    def __repr__(self):
        return f"<Image %r>" % self.id

    def serialize(self):
        return {
            "id": self.id,
            "ruta": self.ruta,
            "user_id": self.user_id,
            "provider_id": self.provider_id,
        }
