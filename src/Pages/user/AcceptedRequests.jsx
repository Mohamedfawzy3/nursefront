import  { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CircularProgress, Container, Grid, Button } from "@mui/material";

export const AcceptedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const nurseId = "66678"; // هتجيبيه من المصادقة لاحقًا

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/acceptRequests?nurse_id=${nurseId}`)
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("خطأ في جلب الطلبات المقدمة", error);
        setLoading(false);
      });
  }, []);

  // ✅ دالة حذف الطلب
  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      try {
        await axios.delete(`http://localhost:5000/api/requests/${id}`);
        // 🔥 تحديث الحالة بعد الحذف
        setRequests(requests.filter(request => request._id !== id));
      } catch (error) {
        console.error("حدث خطأ أثناء حذف الطلب", error);
      }
    }
  };

  if (loading) return <CircularProgress sx={{ display: "block", margin: "50px auto" }} />;

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
        width: "80%",
        marginTop: "-140px",
        marginLeft: "5px",
        textAlign: "right"
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>طلباتي المقدمة</Typography>
      <Grid container spacing={3}>
        {requests.length > 0 ? (
          requests.map((request) => (
            <Grid item xs={12} md={6} lg={4} key={request._id}>
              <Card sx={{ p: 2, textAlign: "right" }}>
                <CardContent>
                  <Typography variant="h6">{request.request_id?.title}</Typography>
                  <Typography color="textSecondary">{request.request_id?.description}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
                    الحالة: 
                    <span style={{ 
                      color: request.status === "approved" ? "green" : 
                            request.status === "rejected" ? "red" : "orange" 
                    }}>
                      {request.status === "approved" ? "مقبول" : 
                      request.status === "rejected" ? "مرفوض" : "قيد المراجعة"}
                    </span>
                  </Typography>

                  {/* ✅ زر الحذف */}
                  <Button 
                    variant="contained" 
                    color="error" 
                    sx={{ mt: 2 }}
                    onClick={() => handleDelete(request._id)}
                  >
                    حذف
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary" sx={{ textAlign: "center", width: "100%" }}>
            لم تقم بإرسال طلبات حتى الآن
          </Typography>
        )}
      </Grid>
    </Container>
  );
};
