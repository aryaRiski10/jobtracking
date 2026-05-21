'use client';
import './css/style.css';
import Link from 'next/link';


export default function Home() {

  return (
    <>
    <section className="hero h-screen relative overflow-hidden">
      <div className="hero-bg">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
      <div className="w-7xl mx-auto relative justify-items-center items-center">
        
        <div className="floating-card fc-left" aria-hidden="true">
          <div className="fc-icon green">
            <i className="ti ti-check" />
          </div>
          <div>
            <div className="fc-title">Offer Accepted!</div>
            <div className="fc-sub">Google · Senior Engineer</div>
          </div>
        </div>
        <div className="floating-card fc-right" aria-hidden="true">
          <div className="fc-icon orange">
            <i className="ti ti-calendar-event" />
          </div>
          <div>
            <div className="fc-title">Interview Today</div>
            <div className="fc-sub">Shopify · 2:00 PM</div>
          </div>
        </div>
        <div className="hero-inner">
          <div className="badge">
            <span className="badge-dot" />
            Lacak semua lamaran kerja Anda
          </div>
          <h1 className="hero-title">
            Kelola Proses Lamaran
            <br />
            Kerja Anda dengan <em>Mudah</em>
          </h1>
          <p className="hero-sub">
            Pantau setiap lamaran, jadwal wawancara, dan progres karier Anda dalam
            satu dasbor yang intuitif dan terorganisir.
          </p>
          <div className="hero-actions">
            <Link href="/dashboard" className="btn-primary">
              <i className="ti ti-rocket" aria-hidden="true" />
              Mulai Sekarang
            </Link>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-num">
                12<span>K+</span>
              </div>
              <div className="stat-lbl">Pengguna Aktif</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">
                98<span>%</span>
              </div>
              <div className="stat-lbl">Tingkat Kepuasan</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">
                3<span>x</span>
              </div>
              <div className="stat-lbl">Lebih Cepat Dapat Kerja</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">
                50<span>K+</span>
              </div>
              <div className="stat-lbl">Lamaran Dilacak</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  );
}
