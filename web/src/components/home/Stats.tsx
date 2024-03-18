const Stats = () => {
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const totalCandidates = getRandomInt(1000, 5000);
  const totalJobs = getRandomInt(50, 200);
  const totalCompanies = getRandomInt(10, 100);
  const totalApplications = getRandomInt(1000, 5000);

  return (
    <div
      className="mt-8 relative bg-cover bg-center backdrop-blur-sm bg-white/30 text-white py-16 text-center"
      style={{ backgroundImage: 'url("https://marketplace.canva.com/EAD2-gV5Sro/2/0/1600w/canva-professional-bright-office-virtual-background-9YaJ3hIk_I0.jpg")' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto relative z-10">
        <div className="flex justify-center items-center">
          <div className="flex-1">
            <p className="text-4xl text-white font-extrabold">{totalCandidates}</p>
            <p className="text-sm text-white">Tổng ứng viên</p>
          </div>
          <div className="flex-1">
            <p className="text-4xl text-white font-extrabold">{totalJobs}</p>
            <p className="text-sm text-white">Tổng công việc</p>
          </div>
          <div className="flex-1">
            <p className="text-4xl text-white font-extrabold">{totalCompanies}</p>
            <p className="text-sm text-white">Tổng công ty</p>
          </div>
          <div className="flex-1">
            <p className="text-4xl text-white font-extrabold">{totalApplications}</p>
            <p className="text-sm text-white">Tổng lượt ứng tuyển</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
